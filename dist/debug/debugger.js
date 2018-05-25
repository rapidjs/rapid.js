'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _qsStringify = require('qs-stringify');

var _qsStringify2 = _interopRequireDefault(_qsStringify);

var _debug = require('../utils/debug');

var _url = require('../utils/url');

var _request = require('../utils/request');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _class = function () {
  function _class(caller) {
    _classCallCheck(this, _class);

    this.caller = caller;
    this.data = {};
    this.logEnabled = true;
  }

  _createClass(_class, [{
    key: 'fakeRequest',
    value: function fakeRequest(type, url) {
      var params = (0, _request.parseRequestData)(type, this.caller.requestData, this.caller.config);
      var lastUrl = this.setLastUrl.apply(this, [type, url].concat(_toConsumableArray(params)));

      this.setLastRequest.apply(this, arguments);

      if (this.logEnabled) {
        (0, _debug.warn)(this.caller.config.modelName + ' made a ' + type.toUpperCase() + ' request (' + lastUrl + ')');
        (0, _debug.warn)(params);
      }

      this.caller.afterRequest({});

      return lastUrl;
    }
  }, {
    key: 'setLastUrl',
    value: function setLastUrl(type, url) {
      var params = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

      var lastUrl = '';

      if (['put', 'post', 'patch'].includes(type)) {
        lastUrl = (0, _url.sanitizeUrl)([this.caller.config.baseURL, url].join('/'), this.caller.config.trailingSlash);
      } else {
        var urlParams = params.params;
        var stringified = urlParams ? '?' + (0, _qsStringify2.default)(urlParams) : '';

        lastUrl = (0, _url.sanitizeUrl)([this.caller.config.baseURL, url].join('/'), this.caller.config.trailingSlash) + stringified;
      }

      lastUrl = (0, _url.sanitizeUrl)(lastUrl, this.caller.config.trailingSlash);

      this.data.lastUrl = lastUrl;

      return lastUrl;
    }
  }, {
    key: 'setLastRequest',
    value: function setLastRequest(type, url) {
      var data = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

      this.data.lastRequest = {
        type: type,
        url: url,
        data: data,
        options: options
      };
    }
  }]);

  return _class;
}();

exports.default = _class;