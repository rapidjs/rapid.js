'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UrlMixin = UrlMixin;

var _url = require('../../utils/url');

function UrlMixin(Rapid) {
  /**
   * Based off the current route that's set this will take a set of params
   * and split it into a URL. This will then reset the route to the default
   * route after building the URL.
   *
   * @param {array} params Can be any length of params that will be joined by /
   * @return {String}
   */
  Rapid.prototype.makeUrl = function makeUrl() {
    for (var _len = arguments.length, params = Array(_len), _key = 0; _key < _len; _key++) {
      params[_key] = arguments[_key];
    }

    if (this.config.trailingSlash) {
      params.push('');
    }

    var url = (0, _url.sanitizeUrl)([this.routes[this.currentRoute]].concat(params).filter(Boolean).join('/'), this.config.trailingSlash);

    // strip the extra .
    // make sure routes don't need to regenerate
    if (this.config.extension) {
      url += '.' + this.config.extension;
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
   * @return {Rapid}
   */
  Rapid.prototype.setURLParams = function setURLParams() {
    var urlParams = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var prepend = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    var overwrite = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

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
  Rapid.prototype.url = function url() {
    this.setURLParams.apply(this, arguments);

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
} // @ts-check