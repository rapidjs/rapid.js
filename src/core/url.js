import isArray from 'lodash/isArray';
import Core from './core';
import { sanitizeUrl } from '../common/url';

class Url extends Core {
  constructor (config) {
    super(config);
  }

  /**
   * Based off the current route that's set this will take a set of params
   * and split it into a URL. This will then reset the route to the default
   * route after building the URL.
   *
   * @param {Spread} params Can be any length of params that will be joined by /
   * @return {String}
   */
  makeUrl (...params) {

    if (this.config.trailingSlash) {
      params.push('');
    }

    let url = this.sanitizeUrl([this.routes[this.currentRoute]].concat(params).join('/'));

    // strip the extra .
    // make sure routes don't need to regenerate
    if (this.config.extension) {
      url += `.${this.config.extension}`;
    }

    // reset currentRoute
    this.setCurrentRoute(this.config.defaultRoute);

    return url;
  }

  /**
   * This just makes sure there are no double slashes and no trailing
   * slash unless the config for it is set.
   *
   * @param {String} url a url to sanitize
   * @return {String}
   */
  sanitizeUrl (url) {
    return sanitizeUrl(url, this.config.trailingSlash);
  }

  /**
   * Reset an URL params set from a relationship
   */
  resetURLParams () {
    this.urlParams = false;
  }

  /**
   * Set the URL params
   *
   * @param {Array} urlParams
   * @param {Boolean} prepend
   * @param {Boolean} overwrite
   * @return {Rapid}
   */
  setURLParams (urlParams = [], prepend = false, overwrite = false) {
    this.urlParams = this.urlParams || [];

    if (!isArray(urlParams)) {
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
  }

  // consider making a .url() alias of the above method?

  /**
   * Set the URL params normally
   *
   * @param {Spread} params
   * @return {Rapid}
   */
  url (...params) {
    this.setURLParams(...params);

    return this;
  }

  /**
   * Set the URL params, but prepending
   *
   * @param {Array} params
   * @return {Rapid}
   */
  prepend (params) {
    this.setURLParams(params, true);

    return this;
  }

  /**
   * Set the URL params, but appending them
   *
   * @param {Array} params
   * @return {Rapid}
   */
  append (params) {
    this.setURLParams(params);

    return this;
  }

}

export default Url;
