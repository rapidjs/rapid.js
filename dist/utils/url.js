'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.makeUrl = makeUrl;
var sanitizeUrl = exports.sanitizeUrl = function sanitizeUrl() {
  var url = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var keepTrailingSlash = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  url = url.replace(/([^:]\/)\/+/g, '$1').replace(/\?$/, '').replace(/^(\/\/)/, '/');

  if (!keepTrailingSlash) {
    url = url.replace(/\/$/, '');
  }

  return url;
};

function makeUrl(instance) {
  for (var _len = arguments.length, params = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    params[_key - 1] = arguments[_key];
  }

  if (instance.config.trailingSlash) {
    params.push('');
  }

  var routeUrl = [instance.routes[instance.currentRoute]].concat(params).filter(Boolean).join('/');
  var url = sanitizeUrl(routeUrl, instance.config.trailingSlash);

  if (instance.config.extension) {
    url += '.' + instance.config.extension;
  }

  return url;
}