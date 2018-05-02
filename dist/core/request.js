import isArray from 'lodash/isArray';
import defaultsDeep from 'lodash/defaultsDeep';
import set from 'lodash/set';
import Url from './url';
import CustomRoute from './custom-route';
import { warn } from '../utils/debug';
var RequestType;
(function (RequestType) {
    RequestType["GET"] = "get";
    RequestType["POST"] = "post";
    RequestType["PUT"] = "put";
    RequestType["PATCH"] = "patch";
    RequestType["HEAD"] = "head";
    RequestType["DELETE"] = "delete";
})(RequestType || (RequestType = {}));
class Request extends Url {
    constructor(config) {
        super(config);
    }
    parseRequestData(type) {
        const requestData = [];
        const { options } = this.requestData;
        let { params } = this.requestData;
        if (['put', 'post', 'patch'].includes(type)) {
            params = defaultsDeep(params, this.config.globalParameters);
            requestData.push(params);
            requestData.push(options);
        }
        else {
            options.params = defaultsDeep(params, this.config.globalParameters);
            requestData.push(options);
        }
        return requestData;
    }
    request(type, url) {
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
    isAllowedRequestType(type) {
        if (!this.config.allowedRequestTypes.includes(type)) {
            if (this.config.debug) {
                warn(`'${type}' is not included in allowedRequestTypes: [${this.config.allowedRequestTypes.join(', ')}]`);
            }
            return false;
        }
        return true;
    }
    buildRequest(type, urlParams) {
        if (this.urlParams) {
            urlParams = this.urlParams.concat(urlParams);
            this.resetURLParams();
        }
        const url = isArray(urlParams) ? this.makeUrl(...urlParams) : this.makeUrl(urlParams);
        return this.request(type, url);
    }
    get(...urlParams) {
        return this.buildRequest('get', urlParams);
    }
    post(...urlParams) {
        return this.buildRequest('post', urlParams);
    }
    put(...urlParams) {
        return this.buildRequest('put', urlParams);
    }
    patch(...urlParams) {
        return this.buildRequest('patch', urlParams);
    }
    head(...urlParams) {
        return this.buildRequest('head', urlParams);
    }
    delete(...urlParams) {
        return this.buildRequest('delete', urlParams);
    }
    route(name = '', routeParams = {}, requestParams = {}) {
        const route = this.getCustomRoute(name, routeParams);
        if (Object.keys(requestParams).length !== 0) {
            this.withParams(requestParams);
        }
        return this.request(route.type, route.url);
    }
    getCustomRoute(name = '', routeParams = {}) {
        if (Object.prototype.hasOwnProperty.call(this.customRoutes, name)) {
            return new CustomRoute(this.customRoutes[name], {
                routeParams,
            });
        }
        return new CustomRoute();
    }
    generate(name = '', routeParams = {}) {
        const { url } = this.getCustomRoute(name, routeParams);
        return url !== '' ? this.makeUrl(this.config.baseURL, url) : '';
    }
    beforeRequest(type, url) {
        return this.config.beforeRequest(type, url);
    }
    afterRequest(response) {
        this.resetRequestData();
        this.resetURLParams();
        this.config.afterRequest(response);
    }
    onError(error) {
        this.resetRequestData();
        this.resetURLParams();
        this.config.onError(error);
    }
    withData(data = {}) {
        this.requestData = defaultsDeep(data, this.requestData);
        return this;
    }
    withParams(params = {}) {
        set(this.requestData, 'params', params);
        return this;
    }
    withParam(key, value) {
        set(this.requestData, `params.${key}`, value);
        return this;
    }
    withOptions(options = {}) {
        set(this.requestData, 'options', options);
        return this;
    }
    withOption(key, value) {
        set(this.requestData, `options.${key}`, value);
        return this;
    }
}
export { RequestType };
export default Request;
