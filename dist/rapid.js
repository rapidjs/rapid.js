"use strict";

var _rapid = _interopRequireDefault(require("./core/rapid"));

var _auth = _interopRequireDefault(require("./auth"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = _rapid.default;
module.exports.Rapid = _rapid.default;
module.exports.Auth = _auth.default;