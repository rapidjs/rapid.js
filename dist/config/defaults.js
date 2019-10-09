'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _config = require('../config');

exports.default = {
  allowedRequestTypes: [_config.requestTypes.GET, _config.requestTypes.POST, _config.requestTypes.PUT, _config.requestTypes.PATCH, _config.requestTypes.HEAD, _config.requestTypes.DELETE, _config.requestTypes.OPTIONS],

  baseURL: 'api',

  caseSensitive: false,

  defaultRoute: _config.routeTypes.MODEL,

  extension: '',

  globalParameters: {},

  http: null,

  methods: {
    create: _config.requestTypes.POST,
    destroy: _config.requestTypes.POST,
    update: _config.requestTypes.POST,
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
    destroy: _config.requestSuffixes.DESTROY,
    update: _config.requestSuffixes.UPDATE,
    restore: _config.requestSuffixes.RESTORE
  },

  trailingSlash: false,

  beforeRequest: function beforeRequest(type, url) {},
  afterRequest: function afterRequest(response) {},
  onError: function onError(response) {}
};