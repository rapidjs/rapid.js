// @ts-check
import { requestSuffixes } from '../../config';
import { sanitizeUrl } from '../../utils/url';

export function UrlMixin(Rapid) {
  /**
   * Based off the current route that's set this will take a set of params
   * and split it into a URL. This will then reset the route to the default
   * route after building the URL.
   *
   * @param {array} params Can be any length of params that will be joined by /
   * @return {String}
   */
  Rapid.prototype.makeUrl = function makeUrl(...params) {
    if (this.config.trailingSlash) {
      params.push('');
    }

    let url = sanitizeUrl([this.routes[this.currentRoute]].concat(params).filter(Boolean).join('/'), this.config.trailingSlash);

    // strip the extra .
    // make sure routes don't need to regenerate
    if (this.config.extension) {
      url += `.${this.config.extension}`;
    }

    this.currentRoute = this.config.defaultRoute;

    return url;
  };

  /**
   * Set the URL params
   *
   * @param {Array} urlParams
   * @param {Boolean} prepend
   * @param {Boolean} overwrite
   * @return {this}
   */
  Rapid.prototype.setURLParams = function setURLParams(urlParams = [], prepend = false, overwrite = false) {
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
    this.setURLParams(...params);

    return this;
  };

  /**
   * Set the URL params, but prepending
   *
   * @param {Array} params
   * @return {this}
   */
  Rapid.prototype.prepend = function prepend(params) {
    this.setURLParams(params, true);

    return this;
  };

  /**
   * Set the URL params, but appending them
   *
   * @param {Array} params
   * @return {this}
   */
  Rapid.prototype.append = function append(params) {
    this.setURLParams(params);

    return this;
  };
}
