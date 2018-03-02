"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _isArray = _interopRequireDefault(require("lodash/isArray"));

var _core = _interopRequireDefault(require("./core"));

var _url = require("../utils/url");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Url =
/*#__PURE__*/
function (_Core) {
  _inherits(Url, _Core);

  function Url(config) {
    _classCallCheck(this, Url);

    return _possibleConstructorReturn(this, (Url.__proto__ || Object.getPrototypeOf(Url)).call(this, config));
  }
  /**
   * Based off the current route that's set this will take a set of params
   * and split it into a URL. This will then reset the route to the default
   * route after building the URL.
   *
   * @param {Spread} params Can be any length of params that will be joined by /
   * @return {String}
   */


  _createClass(Url, [{
    key: "makeUrl",
    value: function makeUrl() {
      for (var _len = arguments.length, params = new Array(_len), _key = 0; _key < _len; _key++) {
        params[_key] = arguments[_key];
      }

      if (this.config.trailingSlash) {
        params.push('');
      }

      var url = this.sanitizeUrl([this.routes[this.currentRoute]].concat(params).join('/')); // strip the extra .
      // make sure routes don't need to regenerate

      if (this.config.extension) {
        url += ".".concat(this.config.extension);
      } // reset currentRoute


      this.currentRoute = this.config.defaultRoute;
      return url;
    }
    /**
     * This just makes sure there are no double slashes and no trailing
     * slash unless the config for it is set.
     *
     * @param {String} url a url to sanitize
     * @return {String}
     */

  }, {
    key: "sanitizeUrl",
    value: function sanitizeUrl(url) {
      return (0, _url.sanitizeUrl)(url, this.config.trailingSlash);
    }
    /**
     * Set the URL params
     *
     * @param {Array} urlParams
     * @param {Boolean} prepend
     * @param {Boolean} overwrite
     * @return {Rapid}
     */

  }, {
    key: "setURLParams",
    value: function setURLParams() {
      var urlParams = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      var prepend = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var overwrite = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      this.urlParams = this.urlParams || [];

      if (!(0, _isArray.default)(urlParams)) {
        urlParams = [urlParams];
      }

      if (overwrite) {
        this.urlParams = urlParams;
        return this;
      }

      if (prepend) {
        this.urlParams = urlParams.concat(this.urlParams);
      } else {
        this.urlParams = this.urlParams.concat(urlParams);
      }

      return this;
    } // consider making a .url() alias of the above method?

    /**
     * Set the URL params normally
     *
     * @param {Spread} params
     * @return {Rapid}
     */

  }, {
    key: "url",
    value: function url() {
      this.setURLParams.apply(this, arguments);
      return this;
    }
    /**
     * Set the URL params, but prepending
     *
     * @param {Array} params
     * @return {Rapid}
     */

  }, {
    key: "prepend",
    value: function prepend(params) {
      this.setURLParams(params, true);
      return this;
    }
    /**
     * Set the URL params, but appending them
     *
     * @param {Array} params
     * @return {Rapid}
     */

  }, {
    key: "append",
    value: function append(params) {
      this.setURLParams(params);
      return this;
    }
  }]);

  return Url;
}(_core.default);

var _default = Url;
exports.default = _default;