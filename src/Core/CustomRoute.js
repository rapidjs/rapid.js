class CustomRoute {
    constructor (route = {}, config = {}) {
        this.route = route;
        this.config = config;
    }

    replaceURLParams () {
        let url = this.rawURL;

        // only do this if we have route params && params to replace
        if (this.urlParams.length && Object.prototype.hasOwnProperty.call(this.config, 'routeParams')) {
            // replace each occurrence of the param with the value passed in
            this.urlParams.forEach((param) => {
                url = url.replace(`{${param}}`, this.config.routeParams[param]);
            });
        }

        return url;
    }

    /**
     * Check if the url has interpolated {} in them
     *
     * @return {Array}
     */
    get urlParams () {
        // eslint-disable-next-line
        let params = this.rawURL.match(/{\s*[\w\.]+\s*}/g);

        // if we have params, strip off the {}
        if (params !== null) {
            // eslint-disable-next-line
            return params.map((x) => {
                return x.match(/[\w\.]+/)[0]; 
            });
        }

        return [];
    }

    get url () {
        return this.replaceURLParams();
    }

    get rawURL () {
        return this.route.url;
    }

    get name () {
        return this.route.name;
    }

    get type () {
        return this.route.type;
    }
}

export default CustomRoute;
