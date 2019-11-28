/**
 * This just makes sure there are no double slashes and no trailing
 * slash unless the config for it is set.
 *
 * @param {String} url a url to sanitize
 * @param {Boolean} keepTrailingSlash a url to sanitize
 * @return {String}
 */
export function sanitizeUrl(url: string = '', keepTrailingSlash: boolean = false): string {
  url = url
    .replace(/([^:]\/)\/+/g, '$1')
    .replace(/\?$/, '')
    .replace(/^(\/\/)/, '/');

  if (!keepTrailingSlash) {
    url = url.replace(/\/$/, '');
  }

  return url;
}
