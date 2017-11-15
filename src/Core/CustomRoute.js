import { sanitizeUrl } from '../common/url';

class CustomRoute {
    constructor (route = {}, config = {}) {
        this.route = route;
        this.config = config;
    }

    get url () {
        return sanitizeUrl(this.rawUrl, this.config.trailingSlash);
    }

    get rawUrl () {
        return this.route.url;
    }

    get name () {
        return this.route.name;
    }

    get type () {
        return this.route.type;
    }

    get beforeRequest () {
        return this.route.beforeRequest;
    }

    get afterRequest () {
        return this.route.afterRequest;
    }
    // name: 'get_user_forget_name',
    // type: 'get',
    // url: '/user/forget/name',
    // beforeRequest() { },
    // afterRequest() { },
}

export default CustomRoute;
