"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const defaultsDeep_1 = __importDefault(require("lodash/defaultsDeep"));
const kebabCase_1 = __importDefault(require("lodash/kebabCase"));
const pluralize_1 = __importDefault(require("pluralize"));
const route_1 = require("./route");
const url_1 = require("../utils/url");
const debugger_1 = __importDefault(require("./../debug/debugger"));
const defaults_1 = __importDefault(require("./defaults"));
const axios_adapter_1 = __importDefault(require("./adapters/axios-adapter"));
class Core {
    constructor(config) {
        this.config = Object.assign({}, defaultsDeep_1.default(config, defaults_1.default));
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
        this.config.baseURL = url_1.sanitizeUrl(this.config.baseURL, this.config.trailingSlash);
    }
    setRoutes() {
        ['model', 'collection'].forEach((route) => this.setRoute(route));
    }
    setRoute(route) {
        let newRoute = '';
        const formattedRoute = {
            model: this.config.modelName,
            collection: pluralize_1.default(this.config.modelName),
            any: '',
        };
        if (this.config.routes[route] !== '') {
            newRoute = this.config.routes[route];
        }
        else {
            newRoute = kebabCase_1.default(formattedRoute[route]).replace(/-/g, this.config.routeDelimeter);
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
        const httpConfig = defaultsDeep_1.default({
            baseURL: this.config.baseURL.replace(/\/$/, ''),
        }, this.config.httpConfig);
        this.http = new axios_adapter_1.default(httpConfig);
    }
    initializeDebugger() {
        this.debugger = this.config.debug ? new debugger_1.default(this) : null;
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
        this.currentRoute = route_1.Route.COLLECTION;
        return this;
    }
    get model() {
        this.currentRoute = route_1.Route.MODEL;
        return this;
    }
    get any() {
        this.currentRoute = route_1.Route.ANY;
        return this;
    }
}
exports.default = Core;
