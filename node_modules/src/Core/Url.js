/**
 * URL Methods
 */

import Core from './Core';
import _isArray from 'lodash.isarray';

class Url extends Core {
    constructor (config) {
        super(config);
    }

    /**
     * Based off the current route that's set this will take a set of params
     * and split it into a URL. This will then reset the route to the default
     * route after building the URL.
     *
     * @param ...params Can be any length of params that will be joined by /
     */
    makeUrl (...params) {

        if(this.config.trailingSlash) {
            params.push('');
        }

        let url = this.sanitizeUrl([this.routes[this.currentRoute]].concat(params).join('/'));

        // reset currentRoute
        this.setCurrentRoute(this.config.defaultRoute);

        return url;
    }

    /**
     * This just makes sure there are no double slashes and no trailing
     * slash unless the config for it is set.
     *
     * @param url a url to sanitize
     */
    sanitizeUrl (url) {
        url = url.replace(/([^:]\/)\/+/g, '$1').replace(/\?$/, '');

        if(!this.config.trailingSlash) {
            url = url.replace(/\/$/, '');
        }

        return url;
    }

    /**
     * Reset an URL params set from a relationship
     */
    resetURLParams () {
        this.urlParams = false;
    }

    /**
     * Set the URL params
     */
    setURLParams (urlParams = [], prepend = false, overwrite = false) {
        this.urlParams = this.urlParams || [];

        if(!_isArray(urlParams)) {
            urlParams = [urlParams];
        }

        if(overwrite) {
            this.urlParams = urlParams;

            return this;
        }

        if(prepend) {
            this.urlParams = urlParams.concat(this.urlParams);
        } else {
            this.urlParams = this.urlParams.concat(urlParams);
        }

        return this;
    }

    // consider making a .url() alias of the above method?

    url (...params) {
        this.setURLParams(...params);

        return this;
    }

}

export default Url;
