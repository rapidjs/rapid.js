'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var requestSuffixes = exports.requestSuffixes = {
  CREATE: 'create',
  DESTROY: 'destroy',
  RESTORE: 'restore',
  UPDATE: 'update'
};

var requestTypes = exports.requestTypes = {
  DELETE: 'delete',
  GET: 'get',
  HEAD: 'head',
  PATCH: 'patch',
  POST: 'post',
  PUT: 'put',
  OPTIONS: 'options'
};

var routeTypes = exports.routeTypes = {
  ANY: 'any',
  COLLECTION: 'collection',
  MODEL: 'model'
};