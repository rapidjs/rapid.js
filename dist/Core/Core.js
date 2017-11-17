'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * The Caramel Core functionality of Rapid
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _lodash = require('lodash');

var _Defaults = require('./Defaults');

var _Defaults2 = _interopRequireDefault(_Defaults);

var _debugger = require('./../debug/debugger');

var _debugger2 = _interopRequireDefault(_debugger);

var _logger = require('./../debug/logger');

var _logger2 = _interopRequireDefault(_logger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Core = function () {
    function Core(config) {
        _classCallCheck(this, Core);

        config = config || {};

        config = (0, _lodash.defaultsDeep)(config, _Defaults2.default);

        this.initialize(config);
    }

    /**
     * Set any config overrides in this method when extending
     */


    _createClass(Core, [{
        key: 'boot',
        value: function boot() {}

        /**
         * Setup the all of properties.
         */

    }, {
        key: 'initialize',
        value: function initialize(config) {
            this.config = config;

            this.initializeRoutes();

            this.boot();

            this.resetURLParams();

            this.fireSetters();

            this.initializeAPI();

            this.setCurrentRoute(this.config.defaultRoute);

            this.initializeDebugger();

            this.initializeLogger();

            this.resetRequestData();

            this.defineCustomRoutes();
        }

        /**
         * Fire the setters. This will make sure the routes are generated properly.
         * Consider if this is really even necessary
         */

    }, {
        key: 'fireSetters',
        value: function fireSetters() {
            var _this = this;

            ['baseURL', 'modelName', 'routeDelimeter', 'caseSensitive'].forEach(function (setter) {
                return _this[setter] = _this.config[setter];
            });
        }

        /**
         * Initialze the debugger if debug is set to true.
         */

    }, {
        key: 'initializeDebugger',
        value: function initializeDebugger() {
            this.debugger = this.config.debug ? new _debugger2.default(this) : false;
        }

        /**
         * Initialze the debugger if debug is set to true.
         */

    }, {
        key: 'initializeLogger',
        value: function initializeLogger() {
            this.logger = this.config.debug ? _logger2.default : false;
        }

        /**
         * Initialize the API.
         */

    }, {
        key: 'initializeAPI',
        value: function initializeAPI() {
            this.api = _axios2.default.create((0, _lodash.defaultsDeep)({ baseURL: this.config.baseURL.replace(/\/$/, '') }, this.config.apiConfig));
        }

        /**
         * Initialize the routes.
         */

    }, {
        key: 'initializeRoutes',
        value: function initializeRoutes() {
            this.routes = {
                model: '',
                collection: '',
                any: ''
            };
        }

        /**
         * Set up the custom routes if we have any
         */

    }, {
        key: 'defineCustomRoutes',
        value: function defineCustomRoutes() {
            var _this2 = this;

            this.customRoutes = {};

            // if we have custom routes, set up a name:route mapping
            if (this.config.customRoutes.length) {
                this.config.customRoutes.forEach(function (route) {
                    _this2.customRoutes[route.name] = route;
                });
            }
        }

        /**
         * Resets the request data
         */

    }, {
        key: 'resetRequestData',
        value: function resetRequestData() {
            this.requestData = {
                params: {},
                options: {}
            };
        }

        /**
         * Setters and Getters
         */

    }, {
        key: 'debug',
        set: function set(val) {
            if (this.config.debug) {
                this.logger.warn('debug mode must explicitly be turned on via the constructor in config.debug');
            }
        }
    }, {
        key: 'collection',
        get: function get() {
            this.setCurrentRoute('collection');

            return this;
        }
    }, {
        key: 'model',
        get: function get() {
            this.setCurrentRoute('model');

            return this;
        }
    }, {
        key: 'any',
        get: function get() {
            this.setCurrentRoute('any');

            return this;
        }
    }, {
        key: 'baseURL',
        set: function set(url) {
            this.config.baseURL = this.sanitizeUrl(url);
            this.initializeAPI();
        }
    }, {
        key: 'modelName',
        set: function set(val) {
            this.config.modelName = val;
            this.setRoutes();
        }
    }, {
        key: 'routeDelimeter',
        set: function set(val) {
            this.config.routeDelimeter = val;
            this.setRoutes();
        }
    }, {
        key: 'caseSensitive',
        set: function set(val) {
            this.config.caseSensitive = val;
            this.setRoutes();
        }
    }]);

    return Core;
}();

exports.default = Core;