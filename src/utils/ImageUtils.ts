/**
 * Turns a GitHub "blob" page URL into a direct raw-file URL, so the image loads
 * without GitHub's extra redirect:
 *   https://github.com/{owner}/{repo}/blob/{branch}/{path}
 *   -> https://raw.githubusercontent.com/{owner}/{repo}/{branch}/{path}
 * Any other URL is returned unchanged.
 */
export function toRawImageUrl(url: string): string {
  const match: RegExpMatchArray | null = url.match(/^https:\/\/github\.com\/([^/]+)\/([^/]+)\/blob\/(.+)$/);
  if (!match) return url;
  const [, owner, repo, rest] = match;
  return `https://raw.githubusercontent.com/${owner}/${repo}/${rest.replace(/\?raw=true$/, "")}`;
}
