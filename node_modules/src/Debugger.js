import qs from 'qs';

export default class {
    constructor (caller) {
        this.caller           = caller;
        this.data             = {};
        this.logEnabled       = false;
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
            lastUrl = this.caller.sanitizeUrl([this.caller.config.baseURL, url].join('/')) + '?'+ qs.stringify(params);
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

    listRoutes () {
        // let coreFunctions = {
        //     'create' : {
        //         method: '',
        //         params: []
        //     },
        //     'find' : {
        //         method: '',
        //         params: []
        //     },
        //     'all' : {
        //         method: '',
        //         params: []
        //     },
        //     'update' : {
        //         method: '',
        //         params: []
        //     },
        //     'destroy' : {
        //         method: '',
        //         params: []
        //     }
        // };
        //
        // console.log(this.caller.methodRoutes);
        //
        // coreFunctions.concat(this.caller.methodRoutes).forEach(func => this.caller[func].call(this.caller));
    }
}
