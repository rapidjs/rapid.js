'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.applyCallableRequestMethods = applyCallableRequestMethods;
exports.RequestMixin = RequestMixin;

var _defaultsDeep = require('lodash/defaultsDeep');

var _defaultsDeep2 = _interopRequireDefault(_defaultsDeep);

var _url = require('../../utils/url');

var _request = require('../../utils/request');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function applyCallableRequestMethods(instance) {
  instance.config.allowedRequestTypes.forEach(function (requestType) {
    instance[requestType] = function (urlParams) {
      return instance.buildRequest(requestType, urlParams);
    };
  });
}

function RequestMixin(Rapid) {
  Rapid.prototype.request = function request(type, url) {
    var _this = this;

    type = type.toLowerCase();

    if (!(0, _request.isAllowedRequestType)(type, this.config)) {
      throw new Error('This request type is not allowed.');
    }

    this.beforeRequest(type, url);

    var requestConfig = this.requestData;

    this.resetRequestData();

    return new Promise(function (resolve, reject) {
      var _http$type;

      (_http$type = _this.http[type]).call.apply(_http$type, [_this, (0, _url.sanitizeUrl)(url, _this.config.trailingSlash)].concat(_toConsumableArray((0, _request.parseRequestData)(type, requestConfig, _this.config)))).then(function (response) {
        _this.afterRequest(response);

        resolve(response);
      }).catch(function (error) {
        _this.onError(error);

        reject(error);
      });
    });
  };

  Rapid.prototype.buildRequest = function buildRequest(type, urlParams) {
    if (this.urlParams) {
      urlParams = this.urlParams.concat(urlParams);
      this.resetUrlParams();
    }

    var url = Array.isArray(urlParams) ? _url.makeUrl.apply(undefined, [this].concat(_toConsumableArray(urlParams))) : (0, _url.makeUrl)(this, urlParams);

    return this.request(type, url);
  };

  Rapid.prototype.beforeRequest = function beforeRequest(type, url) {
    this.resetToDefaultRoute();
    this.config.beforeRequest(type, url);
  };

  Rapid.prototype.afterRequest = function afterRequest(response) {
    this.resetRequestData();
    this.resetUrlParams();
    this.config.afterRequest(response);
  };

  Rapid.prototype.onError = function onError(error) {
    this.resetRequestData();
    this.resetUrlParams();
    this.config.onError(error);
  };

  Rapid.prototype.withConfig = function withConfig() {
    var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    this.requestData = (0, _defaultsDeep2.default)(data, this.requestData);

    return this;
  };

  Rapid.prototype.withParams = function withParams() {
    var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    this.requestData.params = params;

    return this;
  };

  Rapid.prototype.withParam = function withParam(key, value) {
    this.requestData.params[key] = value;

    return this;
  };

  Rapid.prototype.withOptions = function withOptions() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    this.requestData.options = options;

    return this;
  };

  Rapid.prototype.withOption = function withOption(key, value) {
    this.requestData.options[key] = value;

    return this;
  };

  Rapid.prototype.resetRequestData = function resetRequestData() {
    this.requestData = {
      params: {},
      options: {}
    };
  };

  Rapid.prototype.resetToDefaultRoute = function resetToDefaultRoute() {
    this.currentRoute = this.config.defaultRoute;
  };

  Rapid.prototype.resetUrlParams = function resetUrlParams() {
    this.urlParams = [];
  };
}