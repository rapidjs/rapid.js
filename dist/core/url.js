"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const isArray_1 = __importDefault(require("lodash/isArray"));
const core_1 = __importDefault(require("./core"));
const url_1 = require("../utils/url");
class Url extends core_1.default {
    constructor(config) {
        super(config);
    }
    makeUrl(...params) {
        if (this.config.trailingSlash) {
            params.push('');
        }
        let url = this.sanitizeUrl([this.routes[this.currentRoute]].concat(params).join('/'));
        if (this.config.extension) {
            url += `.${this.config.extension}`;
        }
        this.currentRoute = this.config.defaultRoute;
        return url;
    }
    sanitizeUrl(url) {
        return url_1.sanitizeUrl(url, this.config.trailingSlash);
    }
    setURLParams(urlParams = [], prepend = false, overwrite = false) {
        this.urlParams = this.urlParams || [];
        if (!isArray_1.default(urlParams)) {
            urlParams = [urlParams];
        }
        if (overwrite) {
            this.urlParams = urlParams;
            return this;
        }
        if (prepend) {
            this.urlParams = urlParams.concat(this.urlParams);
        }
        else {
            this.urlParams = this.urlParams.concat(urlParams);
        }
        return this;
    }
    url(...params) {
        this.setURLParams(...params);
        return this;
    }
    prepend(params) {
        this.setURLParams(params, true);
        return this;
    }
    append(params) {
        this.setURLParams(params);
        return this;
    }
}
exports.default = Url;
