'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var warn = exports.warn = function warn() {
  var message = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

  var prefix = 'rapid.js';
  console.error('[' + prefix + ']: ' + message);
};