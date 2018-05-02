"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_adapter_1 = __importDefault(require("./adapters/axios-adapter"));
exports.default = {
    allowedRequestTypes: ['get', 'post', 'put', 'patch', 'head', 'delete'],
    apiConfig: {},
    baseURL: 'api',
    caseSensitive: false,
    customRoutes: [],
    debug: false,
    defaultRoute: 'model',
    extension: '',
    globalParameters: {},
    http: axios_adapter_1.default,
    methods: {
        create: 'post',
        update: 'post',
        destroy: 'post',
        restore: 'post',
    },
    modelName: '',
    primaryKey: '',
    routeDelimeter: '-',
    routes: {
        model: '',
        collection: '',
        any: '',
    },
    suffixes: {
        create: 'create',
        update: 'update',
        destroy: 'destroy',
        restore: 'restore',
    },
    trailingSlash: false,
    beforeRequest(type, url) { },
    afterRequest(response) { },
    onError(response) { },
};
