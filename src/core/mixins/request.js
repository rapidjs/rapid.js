import defaultsDeep from 'lodash/defaultsDeep';
import { makeUrl, sanitizeUrl } from '../../utils/url';
import { isAllowedRequestType, parseRequestData } from '../../utils/request';

/**
 * Apply allowed request methods to the class
 *
 * By default this adds: get(), post(), put(), patch(), head(), delete()
 *
 * @param {Rapid} instance
 */
export function applyCallableRequestMethods(instance) {
  instance.config.allowedRequestTypes.forEach(requestType => {
    instance[requestType] = urlParams => instance.buildRequest(requestType, urlParams);
  });
}

export function RequestMixin(Rapid) {
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

    const requestConfig = this.requestData;

    // reset the config before sending off to avoid pollution
    this.resetRequestData();

    return new Promise((resolve, reject) => {
      this.http[type].call(
        this,
        sanitizeUrl(url, this.config.trailingSlash),
        ...parseRequestData(type, requestConfig, this.config),
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
   * @param {String} urlParams
   * @return {Promise}
   */
  Rapid.prototype.buildRequest = function buildRequest(type, urlParams) {
    if (this.urlParams) {
      urlParams = this.urlParams.concat(urlParams);
      this.resetUrlParams();
    }

    const url = Array.isArray(urlParams) ? makeUrl(this, ...urlParams) : makeUrl(this, urlParams);

    return this.request(type, url);
  };

  /**
   * Before, after, and error
   */

  /**
   * Reset the route to the default route
   * and fire any defined
   *
   * @param {String} type
   * @param {String} url
   */
  Rapid.prototype.beforeRequest = function beforeRequest(type, url) {
    this.resetToDefaultRoute();
    this.config.beforeRequest(type, url);
  };

  /**
   * This is fired after each request
   *
   * @param {Object} response
   */
  Rapid.prototype.afterRequest = function afterRequest(response) {
    this.resetRequestData();
    this.resetUrlParams();
    this.config.afterRequest(response);
  };

  /**
   * This is fired on a request error
   * @param {Object} error
   */
  Rapid.prototype.onError = function onError(error) {
    this.resetRequestData();
    this.resetUrlParams();
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
  Rapid.prototype.withConfig = function withConfig(data = {}) {
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

  /**
   * Resets the request data
   */
  Rapid.prototype.resetRequestData = function resetRequestData() {
    this.requestData = {
      params: {},
      options: {},
    };
  };

  /**
   * Resets the request data
   */
  Rapid.prototype.resetToDefaultRoute = function resetToDefaultRoute() {
    this.currentRoute = this.config.defaultRoute;
  };

  /**
   * Reset an URL params for a request
   */
  Rapid.prototype.resetUrlParams = function resetUrlParams() {
    this.urlParams = [];
  };
}
