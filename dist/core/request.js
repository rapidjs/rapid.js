"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const isArray_1 = __importDefault(require("lodash/isArray"));
const defaultsDeep_1 = __importDefault(require("lodash/defaultsDeep"));
const set_1 = __importDefault(require("lodash/set"));
const url_1 = __importDefault(require("./url"));
const custom_route_1 = __importDefault(require("./custom-route"));
const debug_1 = require("../utils/debug");
var RequestType;
(function (RequestType) {
    RequestType["GET"] = "get";
    RequestType["POST"] = "post";
    RequestType["PUT"] = "put";
    RequestType["PATCH"] = "patch";
    RequestType["HEAD"] = "head";
    RequestType["DELETE"] = "delete";
})(RequestType || (RequestType = {}));
exports.RequestType = RequestType;
class Request extends url_1.default {
    constructor(config) {
        super(config);
    }
    parseRequestData(type) {
        const requestData = [];
        const { options } = this.requestData;
        let { params } = this.requestData;
        if (['put', 'post', 'patch'].includes(type)) {
            params = defaultsDeep_1.default(params, this.config.globalParameters);
            requestData.push(params);
            requestData.push(options);
        }
        else {
            options.params = defaultsDeep_1.default(params, this.config.globalParameters);
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
                debug_1.warn(`'${type}' is not included in allowedRequestTypes: [${this.config.allowedRequestTypes.join(', ')}]`);
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
        const url = isArray_1.default(urlParams) ? this.makeUrl(...urlParams) : this.makeUrl(urlParams);
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
            return new custom_route_1.default(this.customRoutes[name], {
                routeParams,
            });
        }
        return new custom_route_1.default();
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
        this.requestData = defaultsDeep_1.default(data, this.requestData);
        return this;
    }
    withParams(params = {}) {
        set_1.default(this.requestData, 'params', params);
        return this;
    }
    withParam(key, value) {
        set_1.default(this.requestData, `params.${key}`, value);
        return this;
    }
    withOptions(options = {}) {
        set_1.default(this.requestData, 'options', options);
        return this;
    }
    withOption(key, value) {
        set_1.default(this.requestData, `options.${key}`, value);
        return this;
    }
}
exports.default = Request;
