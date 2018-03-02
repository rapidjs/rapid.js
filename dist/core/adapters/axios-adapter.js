"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var AxiosAdapter =
/*#__PURE__*/
function () {
  function AxiosAdapter(config) {
    _classCallCheck(this, AxiosAdapter);

    Object.defineProperty(this, "http", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: void 0
    });
    this.http = _axios.default.create(config);
  }

  _createClass(AxiosAdapter, [{
    key: "get",
    value: function get(url, params) {
      return this.http.get(url, params);
    }
  }, {
    key: "post",
    value: function post(url, params) {
      return this.http.post(url, params);
    }
  }, {
    key: "put",
    value: function put(url, params) {
      return this.http.put(url, params);
    }
  }, {
    key: "patch",
    value: function patch(url, params) {
      return this.http.patch(url, params);
    }
  }, {
    key: "head",
    value: function head(url, params) {
      return this.http.head(url, params);
    }
  }, {
    key: "delete",
    value: function _delete(url, params) {
      return this.http.delete(url, params);
    }
  }]);

  return AxiosAdapter;
}();

exports.default = AxiosAdapter;