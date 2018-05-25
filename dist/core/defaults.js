'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
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

  interceptors: {
    request: [],
    response: []
  },

  methods: {
    create: 'post',
    update: 'post',
    destroy: 'post',
    restore: 'post'
  },

  modelName: '',

  primaryKey: '',

  routeDelimeter: '-',

  routes: {
    model: '',
    collection: '',
    any: ''
  },

  suffixes: {
    create: 'create',
    update: 'update',
    destroy: 'destroy',
    restore: 'restore'
  },

  trailingSlash: false,

  beforeRequest: function beforeRequest(type, url) {},
  afterRequest: function afterRequest(response) {},
  onError: function onError(response) {}
};