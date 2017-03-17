/**
 * The Re-Quest to find the API
 */

import Routes from './Routes';
import Debugger from './../Debugger';
import Logger from './../Logger';
import _isArray from 'lodash.isarray';
import _defaultsDeep from 'lodash.defaultsdeep';

class Request extends Routes {
    constructor (config) {
        super(config);
    }

    /**
     * Parse the request data prior to passing it to axios
     *
     * @param type The request type
     */
    parseRequestData (type) {
        let requestData = [],
            params        = this.requestData.params,
            options       = this.requestData.options;

        // axios handles the options differently for the request type
        if(['put', 'post', 'patch'].includes(type)) {
            params = _defaultsDeep(params, this.config.globalParameters);
            requestData.push(params);
            requestData.push(options);
        } else {
            options.params = _defaultsDeep(params, this.config.globalParameters);
            requestData.push(options);
        }

        return requestData;
    }

    /**
     * Make the request
     *
     * @param type The Request type
     * @param url The url
     */
    request (type, url) {
        type = type.toLowerCase();

        if(!this.isAllowedRequestType(type)) {
            return;
        }

        this.beforeRequest(type, url);

        if(this.config.debug) {
            return this.debugger.fakeRequest(type, url);
        }

        return new Promise((resolve, reject) => {
            this.api[type].call(this, this.sanitizeUrl(url), ...this.parseRequestData(type))
                 .then(response => {
                    this.afterRequest(response);

                    resolve(response);
                 })
                 .catch(error => {
                    this.onError(error);

                    reject(error);
                 });
        });
    }

    /**
     * Checks if is a valid request type
     *
     * @param type The request type
     */
    isAllowedRequestType (type) {
        if(!this.config.allowedRequestTypes.includes(type)) {
            Logger.warn(`'${type}' is not included in allowedRequestTypes: [${this.config.allowedRequestTypes.join(', ')}]`);

            return false;
        }

        return true;
    }

    /**
     * to build a request url
     */
    buildRequest (type, urlParams) {

        if(this.urlParams) {
            urlParams = this.urlParams.concat(urlParams);
            this.resetURLParams();
        }

        let url = _isArray(urlParams) ? this.makeUrl(...urlParams) : this.makeUrl(urlParams);

        return this.request(type, url);
    }

    /**
     * Make a GET request
     *
     * @param urlParams The url params to be concatenated to the urlParams (See buildRequest)
     */
    get (...urlParams) {
        return this.buildRequest('get', urlParams);
    }

    /**
     * Make a POST request
     *
     * @param urlParams The url params to be concatenated to the urlParams (See buildRequest)
     */
    post (...urlParams) {
        return this.buildRequest('post', urlParams);
    }

    /**
     * Make a PUT request
     *
     * @param urlParams The url params to be concatenated to the urlParams (See buildRequest)
     */
    put (...urlParams) {
        return this.buildRequest('put', urlParams);
    }

    /**
     * Make a PATCH request
     *
     * @param urlParams The url params to be concatenated to the urlParams (See buildRequest)
     */
    patch (...urlParams) {
        return this.buildRequest('patch', urlParams);
    }

    /**
     * Make a HEAD request
     *
     * @param urlParams The url params to be concatenated to the urlParams (See buildRequest)
     */
    head (...urlParams) {
        return this.buildRequest('head', urlParams);
    }

    /**
     * Make a DELETE request
     *
     * @param urlParams The url params to be concatenated to the urlParams (See buildRequest)
     */
    delete (...urlParams) {
        return this.buildRequest('delete', urlParams);
    }

    /**
     * Before, after, and error
     */

    /**
     * This is fired before the request
     */
    beforeRequest (type, url) {
        return this.config.beforeRequest(type, url);
    }

    /**
     * This is fired after each request
     */
    afterRequest (response) {
        this.resetRequestData();
        this.config.afterRequest(response);
    }

    /**
     * This is fired on a request error
     */
    onError (error) {
        this.resetRequestData();
        this.config.onError(error);
    }


    /**
     * Params and Options
     */

    /**
     * Send data and options with the request
     *
     * @param data An object of params: {}, options: {}
     */
    with (data = {}) {
        this.requestData = _defaultsDeep(data, this.requestData);

        return this;
    }

    /**
     * Send params with the request
     *
     * @param params An object of params
     */
    withParams (params = {}) {
        this.requestData.params = params;

        return this;
    }

    /**
     * Send a single param with the request
     *
     * @param key The key name
     * @param value The value
     */
    withParam (key, value) {
        this.requestData.params[key] = value;

        return this;
    }

    /**
     * Send options with the request
     *
     * @param options An object of options
     */
    withOptions (options = {}) {
        this.requestData.options = options;

        return this;
    }

    /**
     * Send a single option with the request
     *
     * @param key The key name
     * @param value The value
     */
    withOption (key, value) {
        this.requestData.options[key] = value;

        return this;
    }
}

export default Request;
