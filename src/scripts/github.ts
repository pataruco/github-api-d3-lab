import { Octokit, RestEndpointMethodTypes } from '@octokit/rest';

let GH_TOKEN = '';

export const getToken = async (): Promise<string> => {
  const response = await fetch(
    'https://pataruco.s3.amazonaws.com/github-api-d3-lab/github-api-d3-lab-token.json',
  );

  const { GH_TOKEN } = await response.json();
  return GH_TOKEN;
};

const setToken = async (): Promise<void> => {
  const token = await getToken();
  GH_TOKEN = token;
};

Promise.resolve(setToken());

export const octokit = new Octokit({
  auth: GH_TOKEN,
  log: console,
  retry: {
    enabled: true,
  },
  throttle: {
    onRateLimit: (retryAfter: number, options: { [key: string]: any }) => {
      octokit.log.warn(
        `Request quota exhausted for request ${options.method} ${options.url}`,
      );

      if (options.request.retryCount === 0) {
        // only retries once
        console.log(`Retrying after ${retryAfter} seconds!`);
        return true;
      }
    },
    onAbuseLimit: (retryAfter: number, options: { [key: string]: any }) => {
      // does not retry, only logs a warning
      octokit.log.warn(
        `Abuse detected for request ${options.method} ${options.url}`,
      );
    },
  },
});

type User = RestEndpointMethodTypes['users']['getByUsername']['response']['data'];

export const getByUsername = async (username: string): Promise<User> => {
  const { data } = await octokit.users.getByUsername({
    username,
  });
  return data;
};

type Repo = RestEndpointMethodTypes['repos']['get']['response']['data'];

export const getReposByUsername = async (
  username: string,
): Promise<Array<Repo['name']>> => {
  const result: Repo[] = await octokit.paginate('GET /users/:username/repos', {
    username,
  });

  return result.filter((repo) => !repo.fork).map((repo) => repo.name);
};

const repos = [
  'a11y-course',
  'arnie-quotes',
  'bbc-api',
  'bbc-radio-api',
  'bootstrap-lesson',
  'boris',
  'box-model',
  'Class_sounds',
  'danny',
  'fewd-55-git-sandbox',
  'fewd-exercises',
  'fewd-js-example',
  'flag-test-node-version',
  'ga-diageo',
  'ga-fewd-assets',
  'ga-fewd-form-hw',
  'ga-fewd-js-vanilla-plugins',
  'ga-intro-to-code-workshop',
  'ga-lessons',
  'ga-locations',
  'ga-technologies',
  'git-sandbox',
  'github-api-d3-lab',
  'gla2-homeworks',
  'Glide',
  'good-flag-bad-flag',
  'gracias-totales',
  'holocron',
  'holocron-v2',
  'mars-rover',
  'martin-blanco',
  'mhra-git-practice',
  'noosphere',
  'obc-spinner-lab',
  'panworld',
  'pataruco.github.io',
  'peace',
  'penny-parser',
  'peter-of-the-day',
  'pod-api',
  'pod-cli',
  'pod-ui',
  'portfolio',
  'pulseball',
  'random-picker',
  'rust-sandbox',
  'rust-training',
  'sql_dump',
  'svg-spinner-lab',
  'teaching-material',
  'thirtythree',
  'tic-tac-toe',
  'tic-tac-toe-vanilla-js',
  'TSA-Travel-Sentry-master-keys',
  'variable-fonts',
  'venezuelan-petition',
  'villarock_app',
  'wino',
  'You-Dont-Know-JS',
];

type LanguagesPerRepo = RestEndpointMethodTypes['repos']['listLanguages']['response']['data'];

export const getLanguagesByUserAndRepo = async (
  owner: string,
  repo: string,
): Promise<LanguagesPerRepo> => {
  const { data } = await octokit.repos.listLanguages({
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
