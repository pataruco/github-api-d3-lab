import { Octokit, RestEndpointMethodTypes } from '@octokit/rest';

export const getToken = async (): Promise<string> => {
  const response = await fetch(
    'https://pataruco.s3.amazonaws.com/github-api-d3-lab/github-api-d3-lab-token.json',
  );

  const { GH_TOKEN } = await response.json();
  return GH_TOKEN;
};

export const octokit = async () =>
  new Octokit({
    auth: await getToken(),
    log: console,
    retry: {
      enabled: true,
    },
    throttle: {
      onRateLimit: async (
        retryAfter: number,
        options: { [key: string]: any },
      ) => {
        (await octokit()).log.warn(
          `Request quota exhausted for request ${options.method} ${options.url}`,
        );

        if (options.request.retryCount === 0) {
          // only retries once
          console.log(`Retrying after ${retryAfter} seconds!`);
          return true;
        }
      },
      onAbuseLimit: async (
        _retryAfter: number,
        options: { [key: string]: any },
      ) => {
        // does not retry, only logs a warning
        (await octokit()).log.warn(
          `Abuse detected for request ${options.method} ${options.url}`,
        );
      },
    },
  });

type User = RestEndpointMethodTypes['users']['getByUsername']['response']['data'];

export const getByUsername = async (username: string): Promise<User> => {
  try {
    const { data } = await (await octokit()).users.getByUsername({
      username,
    });
    return data;
  } catch (error) {
    console.error(error);
    throw new Error(`Error get user from GitHub: ${error}.`);
  }
};

type Repo = RestEndpointMethodTypes['repos']['get']['response']['data'];

export const getReposByUsername = async (
  username: string,
): Promise<Array<Repo['name']>> => {
  const result: Repo[] = await (await octokit()).paginate(
    'GET /users/:username/repos',
    {
      username,
    },
  );

  return result.filter((repo) => !repo.fork).map((repo) => repo.name);
};

export type LanguagesPerRepo = RestEndpointMethodTypes['repos']['listLanguages']['response']['data'];

export const getLanguagesByUserAndRepo = async (
  owner: string,
  repo: string,
): Promise<LanguagesPerRepo> => {
  const { data } = await (await octokit()).repos.listLanguages({
    owner,
    repo,
  });
  return data;
};

export const getAllLanguagesByUser = async (
  user: string,
): Promise<LanguagesPerRepo[]> => {
  const repos = await getReposByUsername(user);
  return await Promise.all(
    repos.map((repo) => getLanguagesByUserAndRepo(user, repo)),
  );
};

const sumLanguages = (total: LanguagesPerRepo, language: LanguagesPerRepo) => {
  Object.entries(language).forEach(([key, value]) => {
    if (key in total) {
      total = {
        ...total,
        // @ts-expect-error
        [key]: total[key] + value,
      };
    } else {
      total = {
        ...total,
        [key]: value,
      };
    }
  });
  return total;
};

export const getAllLanguagesSumByUser = async (
  user: string,
): Promise<LanguagesPerRepo> => {
  const languages = await getAllLanguagesByUser(user);
  return languages
    .filter((language) => Object.keys(language).length > 0)
    .reduce(sumLanguages, {} as LanguagesPerRepo);
};
