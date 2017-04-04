import qs from 'qs';

export default class {
    constructor (caller) {
        this.caller           = caller;
        this.data             = {};
        this.logEnabled       = true;
    }

    fakeRequest (type, url) {
        let params    = this.caller.parseRequestData(type),
            lastUrl   = this.setLastUrl(type, url, ...params);

        this.setLastRequest(...arguments);

        if(this.logEnabled) {
            this.caller.logger.debug(`${this.caller.config.modelName} made a ${type.toUpperCase()} request (${lastUrl})`);
            this.caller.logger.log(params);
        }

        this.caller.afterRequest({});

        return lastUrl;
    }

    setLastUrl(type, url, params = {}) {
        let lastUrl = '';

        if(['put', 'post', 'patch'].includes(type)) {
            lastUrl = this.caller.sanitizeUrl([this.caller.config.baseURL, url].join('/'));
        } else {
            let urlParams = params.params,
                stringified = urlParams ? '?' + qs.stringify(urlParams) : '';

            lastUrl = this.caller.sanitizeUrl([this.caller.config.baseURL, url].join('/')) + stringified;
        }

        lastUrl = this.caller.sanitizeUrl(lastUrl);

        this.data.lastUrl = lastUrl;

        return lastUrl;
    }

    setLastRequest (type, url, data = {}, options = {}) {
        this.data.lastRequest = {
            type,
            url,
            data,
            options
        };
    }
}
