'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UrlMixin = UrlMixin;

var _url = require('../../utils/url');

function UrlMixin(Rapid) {
  Rapid.prototype.makeUrl = function makeUrl() {
    for (var _len = arguments.length, params = Array(_len), _key = 0; _key < _len; _key++) {
      params[_key] = arguments[_key];
    }

    if (this.config.trailingSlash) {
      params.push('');
    }

    var url = (0, _url.sanitizeUrl)([this.routes[this.currentRoute]].concat(params).filter(Boolean).join('/'), this.config.trailingSlash);

    if (this.config.extension) {
      url += '.' + this.config.extension;
    }

    this.currentRoute = this.config.defaultRoute;

    return url;
  };

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

  Rapid.prototype.url = function url() {
    this.setURLParams.apply(this, arguments);

    return this;
  };

  Rapid.prototype.prepend = function prepend(params) {
    this.setURLParams(params, true);

    return this;
  };

  Rapid.prototype.append = function append(params) {
    this.setURLParams(params);

    return this;
  };
}