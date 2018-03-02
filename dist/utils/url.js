"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sanitizeUrl = void 0;

/**
 * This just makes sure there are no double slashes and no trailing
 * slash unless the config for it is set.
 *
 * @param {String} url a url to sanitize
 * @param {Boolean} keepTrailingSlash a url to sanitize
 * @return {String}
 */
var sanitizeUrl = function sanitizeUrl() {
  var url = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var keepTrailingSlash = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  url = url.replace(/([^:]\/)\/+/g, '$1').replace(/\?$/, '').replace(/^(\/\/)/, '/');

  if (!keepTrailingSlash) {
    url = url.replace(/\/$/, '');
  }

  return url;
};

exports.sanitizeUrl = sanitizeUrl;