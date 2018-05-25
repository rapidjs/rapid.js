'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _isArray = require('lodash/isArray');

var _isArray2 = _interopRequireDefault(_isArray);

var _defaultsDeep = require('lodash/defaultsDeep');

var _defaultsDeep2 = _interopRequireDefault(_defaultsDeep);

var _set = require('lodash/set');

var _set2 = _interopRequireDefault(_set);

var _routes = require('./routes');

var _routes2 = _interopRequireDefault(_routes);

var _customRoute = require('./custom-route');

var _customRoute2 = _interopRequireDefault(_customRoute);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Request = function (_Routes) {
  _inherits(Request, _Routes);

  function Request(config) {
    _classCallCheck(this, Request);

    return _possibleConstructorReturn(this, (Request.__proto__ || Object.getPrototypeOf(Request)).call(this, config));
  }

  _createClass(Request, [{
    key: 'parseRequestData',
    value: function parseRequestData(type) {
      var requestData = [];
      var options = this.requestData.options;
      var params = this.requestData.params;

      if (['put', 'post', 'patch'].includes(type)) {
        params = (0, _defaultsDeep2.default)(params, this.config.globalParameters);
        requestData.push(params);
        requestData.push(options);
      } else {
        options.params = (0, _defaultsDeep2.default)(params, this.config.globalParameters);
        requestData.push(options);
      }

      return requestData;
    }
  }, {
    key: 'request',
    value: function request(type, url) {
      var _this2 = this;

      type = type.toLowerCase();

      if (!this.isAllowedRequestType(type)) {
        throw new Error('This request type is not allowed.');
      }

      this.beforeRequest(type, url);

      if (this.config.debug) {
        return this.debugger.fakeRequest(type, url);
      }

      return new Promise(function (resolve, reject) {
        var _api$type;

        (_api$type = _this2.api[type]).call.apply(_api$type, [_this2, _this2.sanitizeUrl(url)].concat(_toConsumableArray(_this2.parseRequestData(type)))).then(function (response) {
          _this2.afterRequest(response);

          resolve(response);
        }).catch(function (error) {
          _this2.onError(error);

          reject(error);
        });
      });
    }
  }, {
    key: 'isAllowedRequestType',
    value: function isAllowedRequestType(type) {
      if (!this.config.allowedRequestTypes.includes(type)) {
        if (this.config.debug) {
          this.logger.warn('\'' + type + '\' is not included in allowedRequestTypes: [' + this.config.allowedRequestTypes.join(', ') + ']');
        }

        return false;
      }

      return true;
    }
  }, {
    key: 'buildRequest',
    value: function buildRequest(type, urlParams) {
      if (this.urlParams) {
        urlParams = this.urlParams.concat(urlParams);
        this.resetURLParams();
      }

      var url = (0, _isArray2.default)(urlParams) ? this.makeUrl.apply(this, _toConsumableArray(urlParams)) : this.makeUrl(urlParams);

      return this.request(type, url);
    }
  }, {
    key: 'get',
    value: function get() {
      for (var _len = arguments.length, urlParams = Array(_len), _key = 0; _key < _len; _key++) {
        urlParams[_key] = arguments[_key];
      }

      return this.buildRequest('get', urlParams);
    }
  }, {
    key: 'post',
    value: function post() {
      for (var _len2 = arguments.length, urlParams = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        urlParams[_key2] = arguments[_key2];
      }

      return this.buildRequest('post', urlParams);
    }
  }, {
    key: 'put',
    value: function put() {
      for (var _len3 = arguments.length, urlParams = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        urlParams[_key3] = arguments[_key3];
      }

      return this.buildRequest('put', urlParams);
    }
  }, {
    key: 'patch',
    value: function patch() {
      for (var _len4 = arguments.length, urlParams = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
        urlParams[_key4] = arguments[_key4];
      }

      return this.buildRequest('patch', urlParams);
    }
  }, {
    key: 'head',
    value: function head() {
      for (var _len5 = arguments.length, urlParams = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
        urlParams[_key5] = arguments[_key5];
      }

      return this.buildRequest('head', urlParams);
    }
  }, {
    key: 'delete',
    value: function _delete() {
      for (var _len6 = arguments.length, urlParams = Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
        urlParams[_key6] = arguments[_key6];
      }

      return this.buildRequest('delete', urlParams);
    }
  }, {
    key: 'route',
    value: function route() {
      var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      var routeParams = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var requestParams = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

      var route = this.getCustomRoute(name, routeParams);

      if (Object.keys(requestParams).length !== 0) {
        this.withParams(requestParams);
      }

      return this.request(route.type, route.url);
    }
  }, {
    key: 'getCustomRoute',
    value: function getCustomRoute() {
      var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      var routeParams = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      if (Object.prototype.hasOwnProperty.call(this.customRoutes, name)) {
        return new _customRoute2.default(this.customRoutes[name], {
          routeParams: routeParams
        });
      }

      return new _customRoute2.default();
    }
  }, {
    key: 'generate',
    value: function generate() {
      var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      var routeParams = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      var _getCustomRoute = this.getCustomRoute(name, routeParams),
          url = _getCustomRoute.url;

      return url !== '' ? this.makeUrl(this.config.baseURL, url) : '';
    }
  }, {
    key: 'beforeRequest',
    value: function beforeRequest(type, url) {
      return this.config.beforeRequest(type, url);
    }
  }, {
    key: 'afterRequest',
    value: function afterRequest(response) {
      this.resetRequestData();
      this.resetURLParams();
      this.config.afterRequest(response);
    }
  }, {
    key: 'onError',
    value: function onError(error) {
      this.resetRequestData();
      this.resetURLParams();
      this.config.onError(error);
    }
  }, {
    key: 'withData',
    value: function withData() {
      var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      this.requestData = (0, _defaultsDeep2.default)(data, this.requestData);

      return this;
    }
  }, {
    key: 'withParams',
    value: function withParams() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      (0, _set2.default)(this.requestData, 'params', params);

      return this;
    }
  }, {
    key: 'withParam',
    value: function withParam(key, value) {
      (0, _set2.default)(this.requestData, 'params.' + key, value);

      return this;
    }
  }, {
    key: 'withOptions',
    value: function withOptions() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      (0, _set2.default)(this.requestData, 'options', options);

      return this;
    }
  }, {
    key: 'withOption',
    value: function withOption(key, value) {
      (0, _set2.default)(this.requestData, 'options.' + key, value);

      return this;
    }
  }]);

  return Request;
}(_routes2.default);

exports.default = Request;