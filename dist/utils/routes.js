'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generateRoute = exports.formatRoute = exports.buildFormattedRoute = undefined;

var _kebabCase = require('lodash/kebabCase');

var _kebabCase2 = _interopRequireDefault(_kebabCase);

var _pluralize = require('pluralize');

var _pluralize2 = _interopRequireDefault(_pluralize);

var _config = require('../config');

var _defaults = require('../config/defaults');

var _defaults2 = _interopRequireDefault(_defaults);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var buildFormattedRoute = exports.buildFormattedRoute = function buildFormattedRoute(config) {
  var _ref;

  return _ref = {}, _defineProperty(_ref, _config.routeTypes.MODEL, config.modelName), _defineProperty(_ref, _config.routeTypes.COLLECTION, (0, _pluralize2.default)(config.modelName)), _defineProperty(_ref, _config.routeTypes.ANY, ''), _ref;
};

var formatRoute = exports.formatRoute = function formatRoute(routeName) {
  var routeDelimeter = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _defaults2.default.routeDelimeter;
  return (0, _kebabCase2.default)(routeName).replace(/-/g, routeDelimeter);
};

var generateRoute = exports.generateRoute = function generateRoute(route, config) {
  var newRoute = '';
  var formattedRoute = buildFormattedRoute(config);

  if (config.routes[route] !== '') {
    newRoute = config.routes[route];
  } else if (config.caseSensitive) {
    newRoute = formattedRoute[route];
  } else {
    newRoute = formatRoute(formattedRoute[route], config.routeDelimeter);
  }

  return newRoute;
};