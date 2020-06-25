import { Octokit, RestEndpointMethodTypes } from '@octokit/rest';

export const octokit = new Octokit({
  // auth: GH_TOKEN,
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

export const getByUsername = async (
  username: string,
): Promise<
  RestEndpointMethodTypes['users']['getByUsername']['response']['data']
> => {
  const { data } = await octokit.users.getByUsername({
    username,
  });
  return data;
};
