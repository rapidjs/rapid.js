'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _qs = require('qs');

var _qs2 = _interopRequireDefault(_qs);

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
            var params = this.caller.parseRequestData(type),
                lastUrl = this.setLastUrl.apply(this, [type, url].concat(_toConsumableArray(params)));

            this.setLastRequest.apply(this, arguments);

            if (this.logEnabled) {
                this.caller.logger.debug(this.caller.config.modelName + ' made a ' + type.toUpperCase() + ' request (' + lastUrl + ')');
                this.caller.logger.log(params);
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
                lastUrl = this.caller.sanitizeUrl([this.caller.config.baseURL, url].join('/'));
            } else {
                var urlParams = params.params,
                    stringified = urlParams ? '?' + _qs2.default.stringify(urlParams) : '';

                lastUrl = this.caller.sanitizeUrl([this.caller.config.baseURL, url].join('/')) + stringified;
            }

            lastUrl = this.caller.sanitizeUrl(lastUrl);

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