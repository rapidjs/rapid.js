'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isAllowedRequestType = exports.parseRequestData = undefined;

var _defaultsDeep = require('lodash/defaultsDeep');

var _defaultsDeep2 = _interopRequireDefault(_defaultsDeep);

var _config = require('../config');

var _debug = require('../utils/debug');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Parse the request data prior to passing it to the http service
 *
 * @param {String} requestType
 * @param {Object} requestData
 * @param {Object} config
 * @return {Object}
 */
var parseRequestData = exports.parseRequestData = function parseRequestData(requestType, requestData, config) {
  var parsedRequestData = [];
  var options = requestData.options;
  var params = requestData.params;

  // axios handles the options differently for the request type

  if ([_config.requestTypes.PUT, _config.requestTypes.POST, _config.requestTypes.PATCH].includes(requestType)) {
    params = (0, _defaultsDeep2.default)(params, config.globalParameters);
    parsedRequestData.push(params);
    parsedRequestData.push(options);
  } else {
    options.params = (0, _defaultsDeep2.default)(params, config.globalParameters);
    parsedRequestData.push(options);
  }

  return parsedRequestData;
};

/**
 * Checks if is a valid request type
 *
 * @param {String} requestType
 * @param {Object} config
 * @return {Boolean}
 */
var isAllowedRequestType = exports.isAllowedRequestType = function isAllowedRequestType(requestType, config) {
  if (!config.allowedRequestTypes.includes(requestType)) {
    if (config.debug) {
      (0, _debug.warn)('\'' + requestType + '\' is not included in allowedRequestTypes: [' + config.allowedRequestTypes.join(', ') + ']');
    }

    return false;
  }

  return true;
};