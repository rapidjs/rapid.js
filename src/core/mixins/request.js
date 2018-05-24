// @ts-check
import defaultsDeep from 'lodash/defaultsDeep';
import { sanitizeUrl } from '../../utils/url';
import { isAllowedRequestType, parseRequestData } from '../../utils/request';

export function RequestMixin(Rapid) {
  /**
   * Apply allowed request methods to the class
   *
   * By default this adds: get(), post(), put(), patch(), head(), delete()
   */
  Rapid.prototype.applyCallableRequestMethods = function applyCallableRequestMethods() {
    this.config.allowedRequestTypes.forEach(requestType => {
      this[requestType] = (...urlParams) => this.buildRequest(requestType, urlParams);
    });
  };

  /**
   * Make the request
   *
   * @param {String} type The Request type
   * @param {String} url The url
   * @return {Promise}
   */
  Rapid.prototype.request = function request(type, url) {
    type = type.toLowerCase();

    if (!isAllowedRequestType(type, this.config)) {
      throw new Error('This request type is not allowed.');
    }

    this.beforeRequest(type, url);

    if (this.config.debug) {
      return this.debugger.fakeRequest(type, url);
    }

    return new Promise((resolve, reject) => {
      this.http[type].call(
        this,
        sanitizeUrl(url, this.config.trailingSlash),
        ...parseRequestData(type, this.requestData, this.config),
      )
        .then(response => {
          this.afterRequest(response);

          resolve(response);
        })
        .catch(error => {
          this.onError(error);

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

    const url = Array.isArray(urlParams) ? this.makeUrl(...urlParams) : this.makeUrl(urlParams);

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
  Rapid.prototype.withData = function withData(data = {}) {
    this.requestData = defaultsDeep(data, this.requestData);

    return this;
  };

  /**
   * Send params with the request
   *
   * @param {Object} params An object of params
   * @return {this}
   */
  Rapid.prototype.withParams = function withParams(params = {}) {
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
  Rapid.prototype.withOptions = function withOptions(options = {}) {
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
}
