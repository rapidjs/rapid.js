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

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } } // @ts-check


/**
 * Apply allowed request methods to the class
 *
 * By default this adds: get(), post(), put(), patch(), head(), delete()
 *
 * @param {Rapid} instance
 */
function applyCallableRequestMethods(instance) {
  instance.config.allowedRequestTypes.forEach(function (requestType) {
    instance[requestType] = function () {
      for (var _len = arguments.length, urlParams = Array(_len), _key = 0; _key < _len; _key++) {
        urlParams[_key] = arguments[_key];
      }

      return instance.buildRequest(requestType, urlParams);
    };
  });
}

function RequestMixin(Rapid) {
  /**
   * Make the request
   *
   * @param {String} type The Request type
   * @param {String} url The url
   * @return {Promise}
   */
  Rapid.prototype.request = function request(type, url) {
    var _this = this;

    type = type.toLowerCase();

    if (!(0, _request.isAllowedRequestType)(type, this.config)) {
      throw new Error('This request type is not allowed.');
    }

    this.beforeRequest(type, url);

    if (this.config.debug) {
      return this.debugger.fakeRequest(type, url);
    }

    return new Promise(function (resolve, reject) {
      var _http$type;

      (_http$type = _this.http[type]).call.apply(_http$type, [_this, (0, _url.sanitizeUrl)(url, _this.config.trailingSlash)].concat(_toConsumableArray((0, _request.parseRequestData)(type, _this.requestData, _this.config)))).then(function (response) {
        _this.afterRequest(response);

        resolve(response);
      }).catch(function (error) {
        _this.onError(error);

        reject(error);
      });
    });
  };

  /**
   * Build a request URL
   *
   * @param {String} type
   * @param {Array} urlParams
   * @return {Promise}
   */
  Rapid.prototype.buildRequest = function buildRequest(type, urlParams) {
    if (this.urlParams) {
      urlParams = this.urlParams.concat(urlParams);
      this.resetURLParams();
    }

    var url = Array.isArray(urlParams) ? this.makeUrl.apply(this, _toConsumableArray(urlParams)) : this.makeUrl(urlParams);

    return this.request(type, url);
  };

  /**
   * Before, after, and error
   */

  /**
   * This is fired before the request
   * @param {String} type
   * @param {String} url
   * @return {Function}
   */
  Rapid.prototype.beforeRequest = function beforeRequest(type, url) {
    return this.config.beforeRequest(type, url);
  };

  /**
   * This is fired after each request
   * @param {Object} response
   */
  Rapid.prototype.afterRequest = function afterRequest(response) {
    this.resetRequestData();
    this.resetURLParams();
    this.config.afterRequest(response);
  };

  /**
   * This is fired on a request error
   * @param {Object} error
   */
  Rapid.prototype.onError = function onError(error) {
    this.resetRequestData();
    this.resetURLParams();
    this.config.onError(error);
  };

  /**
   * Params and Options
   */

  /**
   * Send data and options with the request
   *
   * @param {Object} data An object of params: {}, options: {}
   * @return {this}
   */
  Rapid.prototype.withData = function withData() {
    var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    this.requestData = (0, _defaultsDeep2.default)(data, this.requestData);

    return this;
  };

  /**
   * Send params with the request
   *
   * @param {Object} params An object of params
   * @return {this}
   */
  Rapid.prototype.withParams = function withParams() {
    var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    this.requestData.params = params;

    return this;
  };

  /**
   * Send a single param with the request
   *
   * @param {Number|String} key The key name
   * @param {Number|String} value The value
   * @return {this}
   */
  Rapid.prototype.withParam = function withParam(key, value) {
    this.requestData.params[key] = value;

    return this;
  };

  /**
   * Send options with the request
   *
   * @param {Object} options An object of options
   * @return {this}
   */
  Rapid.prototype.withOptions = function withOptions() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    this.requestData.options = options;

    return this;
  };

  /**
   * Send a single option with the request
   *
   * @param {Number|String} key The key name
   * @param {Number|String} value The value
   * @return {this}
   */
  Rapid.prototype.withOption = function withOption(key, value) {
    this.requestData.options[key] = value;

    return this;
  };

  /**
   * Resets the request data
   */
  Rapid.prototype.resetRequestData = function resetRequestData() {
    this.requestData = Object.create({
      params: {},
      options: {}
    });
  };

  /**
   * Reset an URL params for a request
   */
  Rapid.prototype.resetURLParams = function resetURLParams() {
    this.urlParams = [];
  };
}