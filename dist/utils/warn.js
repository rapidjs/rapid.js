"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.warn = void 0;

var warn = function warn(message) {
  var prefix = 'rapid.js';
  console.error("[".concat(prefix, "]: ").concat(message));
};

exports.warn = warn;