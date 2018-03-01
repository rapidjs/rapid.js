import isArray from 'lodash/isArray';
import defaultsDeep from 'lodash/defaultsDeep';
import set from 'lodash/set';
import Routes from './routes';
import CustomRoute from './custom-route';

class Request extends Routes {
  constructor (config) {
    super(config);
  }

  /**
   * Parse the request data prior to passing it to axios
   *
   * @param {String} type The request type
   * @return {Object}
   */
  parseRequestData (type) {
    const requestData = [];
    const { options } = this.requestData;
    let { params } = this.requestData;

    // axios handles the options differently for the request type
    if (['put', 'post', 'patch'].includes(type)) {
      params = defaultsDeep(params, this.config.globalParameters);
      requestData.push(params);
      requestData.push(options);
    } else {
      options.params = defaultsDeep(params, this.config.globalParameters);
      requestData.push(options);
    }

    return requestData;
  }

  /**
   * Make the request
   *
   * @param {String} type The Request type
   * @param {String} url The url
   * @return {Promise}
   */
  request (type: RequestType, url) {
    type = type.toLowerCase();

    if (!this.isAllowedRequestType(type)) {
      throw new Error('This request type is not allowed.');
    }

    this.beforeRequest(type, url);

    if (this.config.debug) {
      return this.debugger.fakeRequest(type, url);
    }

    return new Promise((resolve, reject) => {
      this.http[type].call(this, this.sanitizeUrl(url), ...this.parseRequestData(type))
        .then((response) => {
          this.afterRequest(response);

          resolve(response);
        })
        .catch((error) => {
          this.onError(error);

          reject(error);
        });
    });
  }

  /**
   * Checks if is a valid request type
   *
   * @param {String} type The request type
   * @return {Boolean}
   */
  isAllowedRequestType (type) {
    if (!this.config.allowedRequestTypes.includes(type)) {
      if (this.config.debug) {
        warn(`'${type}' is not included in allowedRequestTypes: [${this.config.allowedRequestTypes.join(', ')}]`);
      }

      return false;
    }

    return true;
  }

  /**
   * Build a request URL
   *
   * @param {String} type
   * @param {Array} urlParams
   * @return {Promise}
   */
  buildRequest (type, urlParams) {
    if (this.urlParams) {
      urlParams = this.urlParams.concat(urlParams);
      this.resetURLParams();
    }

    const url = isArray(urlParams) ? this.makeUrl(...urlParams) : this.makeUrl(urlParams);

    return this.request(type, url);
  }

  /**
   * Make a GET request
   *
   * @param {Spread} urlParams The url params to be concatenated to the urlParams (See buildRequest)
   * @return {Promise}
   */
  get (...urlParams) {
    return this.buildRequest('get', urlParams);
  }

  /**
   * Make a POST request
   *
   * @param {Spread} urlParams The url params to be concatenated to the urlParams (See buildRequest)
   * @return {Promise}
   */
  post (...urlParams) {
    return this.buildRequest('post', urlParams);
  }

  /**
   * Make a PUT request
   *
   * @param {Spread} urlParams The url params to be concatenated to the urlParams (See buildRequest)
   * @return {Promise}
   */
  put (...urlParams) {
    return this.buildRequest('put', urlParams);
  }

  /**
   * Make a PATCH request
   *
   * @param {Spread} urlParams The url params to be concatenated to the urlParams (See buildRequest)
   * @return {Promise}
   */
  patch (...urlParams) {
    return this.buildRequest('patch', urlParams);
  }

  /**
   * Make a HEAD request
   *
   * @param {Spread} urlParams The url params to be concatenated to the urlParams (See buildRequest)
   * @return {Promise}
   */
  head (...urlParams) {
    return this.buildRequest('head', urlParams);
  }

  /**
   * Make a DELETE request
   *
   * @param {Spread} urlParams The url params to be concatenated to the urlParams (See buildRequest)
   * @return {Promise}
   */
  delete (...urlParams) {
    return this.buildRequest('delete', urlParams);
  }

  /**
     * Custom Routes
     *
     * These can be defined and passed via the customRoutes config attribute.
     * This allows you to completely override Rapid's usual functionality
     * and use this more like a router.
     */

  /**
   * Make a request to a route via a given route name
   * The request type depends on the type of request defined in the route
   *
   * @param {String} name
   * @param {Object} routeParams
   * @param {Object} requestParams
   * @return {Promise}
   */
  route (name = '', routeParams = {}, requestParams = {}) {
    const route = this.getCustomRoute(name, routeParams);

    // if there are request params, set them
    if (Object.keys(requestParams).length !== 0) {
      this.withParams(requestParams);
    }

    return this.request(route.type, route.url);
  }

  /**
     * Get a CustomRoute via given name
     *
     * @param {String} name
     * @param {Object} routeParams
    * @return {CustomRoute}
     */
  getCustomRoute (name = '', routeParams = {}) {
    // if a route exists, return a new instance of CustomRoute
    if (Object.prototype.hasOwnProperty.call(this.customRoutes, name)) {
      return new CustomRoute(this.customRoutes[name], {
        routeParams,
      });
    }

    // to prevent having undefined
    return new CustomRoute();
  }

  /**
   * Generate a url to a custom defined route
   * This applies the baseURL and the trailing slash config
   * as well
   *
   * @param {String} name
   * @param {Object} routeParams
   * @return {String}
   */
  generate (name = '', routeParams = {}) {
    const { url } = this.getCustomRoute(name, routeParams);

    return url !== '' ? this.makeUrl(this.config.baseURL, url) : '';
  }

  /**
   * Before, after, and error
   */

  /**
   * This is fired before the request
   * @param {String} type
   * @param {String} url
   * @return {Function}
   */
  beforeRequest (type, url) {
    return this.config.beforeRequest(type, url);
  }

  /**
   * This is fired after each request
   * @param {Object} response
   */
  afterRequest (response) {
    this.resetRequestData();
    this.resetURLParams();
    this.config.afterRequest(response);
  }

  /**
   * This is fired on a request error
   * @param {Object} error
   */
  onError (error) {
    this.resetRequestData();
    this.resetURLParams();
    this.config.onError(error);
  }

  /**
     * Params and Options
     */

  /**
   * Send data and options with the request
   *
   * @param {Object} data An object of params: {}, options: {}
   * @return {Rapid}
   */
  withData (data = {}) {
    this.requestData = defaultsDeep(data, this.requestData);

    return this;
  }

  /**
   * Send params with the request
   *
   * @param {Object} params An object of params
   * @return {Rapid}
   */
  withParams (params = {}) {
    set(this.requestData, 'params', params);

    return this;
  }

  /**
   * Send a single param with the request
   *
   * @param {Number|String} key The key name
   * @param {Number|String} value The value
   * @return {Rapid}
   */
  withParam (key, value) {
    set(this.requestData, `params.${key}`, value);

    return this;
  }

  /**
   * Send options with the request
   *
   * @param {Object} options An object of options
   * @return {Rapid}
   */
  withOptions (options = {}) {
    set(this.requestData, 'options', options);

    return this;
  }

  /**
   * Send a single option with the request
   *
   * @param {Number|String} key The key name
   * @param {Number|String} value The value
   * @return {Rapid}
   */
  withOption (key, value) {
    set(this.requestData, `options.${key}`, value);

    return this;
  }
}

export default Request;
