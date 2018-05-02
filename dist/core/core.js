import defaultsDeep from 'lodash/defaultsDeep';
import kebabCase from 'lodash/kebabCase';
import pluralize from 'pluralize';
import { Route } from './route';
import { sanitizeUrl } from '../utils/url';
import Debugger from './../debug/debugger';
import Defaults from './defaults';
import AxiosAdapter from './adapters/axios-adapter';
class Core {
    constructor(config) {
        this.config = Object.assign({}, defaultsDeep(config, Defaults));
        this.currentRoute = this.config.defaultRoute;
        this.customRoutes = [];
        this.requestData = {
            params: {},
            options: {},
        };
        this.routes = this.config.routes;
        this.urlParams = [];
        this.initialize();
    }
    initialize() {
        this.boot();
        this.sanitizeBaseURL();
        this.setRoutes();
        this.defineCustomRoutes();
        this.initializeHttp();
        this.initializeDebugger();
    }
    boot() { }
    sanitizeBaseURL() {
        this.config.baseURL = sanitizeUrl(this.config.baseURL, this.config.trailingSlash);
    }
    setRoutes() {
        ['model', 'collection'].forEach((route) => this.setRoute(route));
    }
    setRoute(route) {
        let newRoute = '';
        const formattedRoute = {
            model: this.config.modelName,
            collection: pluralize(this.config.modelName),
            any: '',
        };
        if (this.config.routes[route] !== '') {
            newRoute = this.config.routes[route];
        }
        else {
            newRoute = kebabCase(formattedRoute[route]).replace(/-/g, this.config.routeDelimeter);
            if (this.config.caseSensitive) {
                newRoute = formattedRoute[route];
            }
        }
        this.routes[route] = newRoute;
    }
    defineCustomRoutes() {
        if (this.config.customRoutes.length) {
            this.config.customRoutes.forEach((route) => {
                this.customRoutes[route.name] = route;
            });
        }
    }
    initializeHttp() {
        const httpConfig = defaultsDeep({
            baseURL: this.config.baseURL.replace(/\/$/, ''),
        }, this.config.httpConfig);
        this.http = new AxiosAdapter(httpConfig);
    }
    initializeDebugger() {
        this.debugger = this.config.debug ? new Debugger(this) : null;
    }
    resetRequestData() {
        this.requestData = {
            params: {},
            options: {},
        };
    }
    resetURLParams() {
        this.urlParams = [];
    }
    get collection() {
        this.currentRoute = Route.COLLECTION;
        return this;
    }
    get model() {
        this.currentRoute = Route.MODEL;
        return this;
    }
    get any() {
        this.currentRoute = Route.ANY;
        return this;
    }
}
export default Core;
