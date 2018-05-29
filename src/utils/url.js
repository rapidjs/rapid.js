// @ts-check
/**
 * This just makes sure there are no double slashes and no trailing
 * slash unless the config for it is set.
 *
 * @param {String} url a url to sanitize
 * @param {Boolean} keepTrailingSlash a url to sanitize
 * @return {String}
 */
export const sanitizeUrl = (url = '', keepTrailingSlash = false) => {
  url = url.replace(/([^:]\/)\/+/g, '$1').replace(/\?$/, '').replace(/^(\/\/)/, '/');

  if (!keepTrailingSlash) {
    url = url.replace(/\/$/, '');
  }

  return url;
};

/**
 * Based off the current route that's set this will take a set of params
 * and split it into a URL. This will then reset the route to the default
 * route after building the URL.
 *
 * @param {Rapid} instance
 * @param {array} params Can be any length of params that will be joined by /
 * @return {String}
 */
export function makeUrl(instance, ...params) {
  if (instance.config.trailingSlash) {
    params.push('');
  }

  const routeUrl = [instance.routes[instance.currentRoute]].concat(params).filter(Boolean).join('/');
  let url = sanitizeUrl(routeUrl, instance.config.trailingSlash);

  // strip the extra .
  // make sure routes don't need to regenerate
  if (instance.config.extension) {
    url += `.${instance.config.extension}`;
  }

  return url;
}
