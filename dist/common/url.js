'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sanitizeUrl = sanitizeUrl;
function sanitizeUrl() {
  var url = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var keepTrailingSlash = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  url = url.replace(/([^:]\/)\/+/g, '$1').replace(/\?$/, '').replace(/^(\/\/)/, '/');

  if (!keepTrailingSlash) {
    url = url.replace(/\/$/, '');
  }

  return url;
}

exports.default = {
  sanitizeUrl: sanitizeUrl
};