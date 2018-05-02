import isArray from 'lodash/isArray';
import Core from './core';
import { sanitizeUrl } from '../utils/url';
class Url extends Core {
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
        return sanitizeUrl(url, this.config.trailingSlash);
    }
    setURLParams(urlParams = [], prepend = false, overwrite = false) {
        this.urlParams = this.urlParams || [];
        if (!isArray(urlParams)) {
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
export default Url;
