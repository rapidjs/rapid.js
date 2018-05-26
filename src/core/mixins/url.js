// @ts-check
import { sanitizeUrl } from '../../utils/url';

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

  instance.currentRoute = instance.config.defaultRoute;

  return url;
}

export function UrlMixin(Rapid) {
  /**
   * Set the URL params
   *
   * @param {Array} urlParams
   * @param {Boolean} prepend
   * @param {Boolean} overwrite
   * @return {Rapid}
   */
  Rapid.prototype.setUrlParams = function setUrlParams(
    urlParams = [],
    prepend = false,
    overwrite = false,
  ) {
    this.urlParams = this.urlParams || [];

    if (!Array.isArray(urlParams)) {
      urlParams = [urlParams];
    }

    if (overwrite) {
      this.urlParams = urlParams;

      return this;
    }

    if (prepend) {
      this.urlParams = urlParams.concat(this.urlParams);
    } else {
      this.urlParams = this.urlParams.concat(urlParams);
    }

    return this;
  };

  /**
   * Set the URL params normally
   *
   * @param {array} params
   * @return {this}
   */
  Rapid.prototype.url = function url(...params) {
    this.setUrlParams(...params);

    return this;
  };

  /**
   * Set the URL params, but prepending
   *
   * @param {Array} params
   * @return {this}
   */
  Rapid.prototype.prepend = function prepend(params) {
    this.setUrlParams(params, true);

    return this;
  };

  /**
   * Set the URL params, but appending them
   *
   * @param {Array} params
   * @return {this}
   */
  Rapid.prototype.append = function append(params) {
    this.setUrlParams(params);

    return this;
  };
}
