import { RequestType } from './request';
class CustomRoute {
    constructor(route = {}, config = {}) {
        this.route = Object.assign({
            url: '',
            type: RequestType.GET,
            name: '',
        }, route);
        this.config = Object.assign({
            routeParams: {},
        }, config);
    }
    replaceURLParams() {
        let url = this.rawURL;
        if (this.urlParams.length && Object.keys(this.config.routeParams).length !== 0) {
            this.urlParams.forEach((param) => {
                url = url.replace(`{${param}}`, this.config.routeParams[param]);
            });
        }
        return url;
    }
    get urlParams() {
        let params = this.rawURL.match(/{\s*[\w\.]+\s*}/g);
        if (params !== null) {
            return params.map(x => x.match(/[\w\.]+/)[0]);
        }
        return [];
    }
    get url() {
        return this.replaceURLParams();
    }
    get rawURL() {
        return this.route.url;
    }
    get name() {
        return this.route.name;
    }
    get type() {
        return RequestType[this.route.type];
    }
}
export default CustomRoute;
