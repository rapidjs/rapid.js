'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Logger = function () {
    function Logger(prefix) {
        _classCallCheck(this, Logger);

        this.prefix = prefix;
        this.firedDebugNotice = false;
        this.fireDebugNotice();
    }

    _createClass(Logger, [{
        key: 'fireDebugNotice',
        value: function fireDebugNotice() {
            if (!this.firedDebugNotice) {
                this.debug('You are running Rapid in debug mode. All requests will be mimicked.');

                this.firedDebugNotice = true;
            }
        }
    }, {
        key: 'debug',
        value: function debug(message) {
            console.info('[' + this.prefix + ']: ' + message);
        }
    }, {
        key: 'log',
        value: function log(message) {
            console.log('[' + this.prefix + ']:', message);
        }
    }, {
        key: 'warn',
        value: function warn(message) {
            console.warn('[' + this.prefix + ' warn]:', message);
        }
    }]);

    return Logger;
}();

exports.default = new Logger('rapid js');