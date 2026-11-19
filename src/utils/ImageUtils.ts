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

/**
 * Smaller WebP version of a screenshot, resized on the fly by the free wsrv.nl image service
 * (e.g. a 520 KB PNG becomes an ~18 KB thumbnail). Use with `fallbackToOriginal` so the
 * original image is shown if the service is ever unavailable.
 */
export function toThumbnailUrl(url: string, width: number): string {
  const source: string = toRawImageUrl(url);
  return `https://wsrv.nl/?url=${encodeURIComponent(source)}&w=${width}&output=webp&q=78`;
}

/** onError handler: switch a thumbnail back to the original image (once). */
export function fallbackToOriginal(originalUrl: string) {
  return (event: { currentTarget: HTMLImageElement }): void => {
    const img: HTMLImageElement = event.currentTarget;
    const original: string = toRawImageUrl(originalUrl);
    if (img.src !== original) img.src = original;
  };
}
