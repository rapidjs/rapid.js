"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UrlMixin = UrlMixin;
function UrlMixin(Rapid) {
  Rapid.prototype.setUrlParams = function setUrlParams() {
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
    this.setUrlParams.apply(this, arguments);

    return this;
  };

  Rapid.prototype.prepend = function prepend(params) {
    this.setUrlParams(params, true);

    return this;
  };

  Rapid.prototype.append = function append(params) {
    this.setUrlParams(params);

    return this;
  };
}