'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = {
    modelName: '',

    primaryKey: '',

    baseURL: 'api',

    trailingSlash: false,

    extension: '',

    caseSensitive: false,

    routeDelimeter: '-',

    globalParameters: {},

    suffixes: {
        create: 'create',
        update: 'update',
        destroy: 'destroy'
    },

    methods: {
        create: 'post',
        update: 'post',
        destroy: 'post'
    },

    routes: {
        model: '',
        collection: '',
        any: ''
    },

    defaultRoute: 'model',

    debug: false,

    apiConfig: {},

    allowedRequestTypes: ['get', 'post', 'put', 'patch', 'head', 'delete'],

    beforeRequest: function beforeRequest(type, url) {},
    afterRequest: function afterRequest(response) {},
    onError: function onError(response) {}
};