'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isAllowedRequestType = exports.parseRequestData = undefined;

var _defaultsDeep = require('lodash/defaultsDeep');

var _defaultsDeep2 = _interopRequireDefault(_defaultsDeep);

var _config = require('../config');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var parseRequestData = exports.parseRequestData = function parseRequestData(requestType, requestData, config) {
  var parsedRequestData = [];
  var options = requestData.options;
  var params = requestData.params;

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

var isAllowedRequestType = exports.isAllowedRequestType = function isAllowedRequestType(requestType, config) {
  if (!config.allowedRequestTypes.includes(requestType)) {
    return false;
  }

  return true;
};