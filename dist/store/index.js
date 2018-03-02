"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _createStore = require("../utils/create-store");

var _mutations = _interopRequireDefault(require("./mutations"));

var _state = _interopRequireDefault(require("./state"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var store = (0, _createStore.createStore)({
  mutations: _mutations.default,
  state: _state.default
});
var _default = store;
exports.default = _default;