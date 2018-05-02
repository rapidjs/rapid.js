"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const qs_1 = __importDefault(require("qs"));
class default_1 {
    constructor(caller) {
        this.caller = caller;
        this.caller = caller;
        this.data = {};
        this.logEnabled = true;
    }
    fakeRequest(type, url) {
        const params = this.caller.parseRequestData(type);
        const lastUrl = this.setLastUrl(type, url, ...params);
        this.setLastRequest(type, url);
        if (this.logEnabled) {
            this.caller.logger.debug(`${this.caller.config.modelName} made a ${type.toUpperCase()} request (${lastUrl})`);
            this.caller.logger.log(params);
        }
        this.caller.afterRequest({});
        return lastUrl;
    }
    setLastUrl(type, url, params = { params: {} }) {
        let lastUrl = '';
        if (['put', 'post', 'patch'].includes(type)) {
            lastUrl = this.caller.sanitizeUrl([this.caller.config.baseURL, url].join('/'));
        }
        else {
            const urlParams = params.params;
            const stringified = urlParams ? `?${qs_1.default.stringify(urlParams)}` : '';
            lastUrl = this.caller.sanitizeUrl([this.caller.config.baseURL, url].join('/')) + stringified;
        }
        lastUrl = this.caller.sanitizeUrl(lastUrl);
        this.data.lastUrl = lastUrl;
        return lastUrl;
    }
    setLastRequest(type, url, data = {}, options = {}) {
        this.data.lastRequest = {
            type,
            url,
            data,
            options,
        };
    }
}
exports.default = default_1;
