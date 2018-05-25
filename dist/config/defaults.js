'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _config = require('../config');

exports.default = {
  allowedRequestTypes: [_config.requestTypes.GET, _config.requestTypes.POST, _config.requestTypes.PUT, _config.requestTypes.PATCH, _config.requestTypes.HEAD, _config.requestTypes.DELETE],

  apiConfig: {},

  baseURL: 'api',

  caseSensitive: false,

  customRoutes: [],

  debug: false,

  defaultRoute: _config.routeTypes.MODEL,

  extension: '',

  globalParameters: {},

  http: null,

  interceptors: {
    request: [],
    response: []
  },

  methods: {
    create: _config.requestTypes.POST,
    update: _config.requestTypes.POST,
    destroy: _config.requestTypes.POST,
    restore: _config.requestTypes.POST
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
    create: _config.requestSuffixes.CREATE,
    update: _config.requestSuffixes.UPDATE,
    destroy: _config.requestSuffixes.DESTROY,
    restore: _config.requestSuffixes.RESTORE
  },

  trailingSlash: false,

  beforeRequest: function beforeRequest(type, url) {},
  afterRequest: function afterRequest(response) {},
  onError: function onError(response) {}
};