'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _lodash = require('lodash');

var _pluralize = require('pluralize');

var _pluralize2 = _interopRequireDefault(_pluralize);

var _Url2 = require('./Url');

var _Url3 = _interopRequireDefault(_Url2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * The Rapid Routes
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var Routes = function (_Url) {
    _inherits(Routes, _Url);

    function Routes(config) {
        _classCallCheck(this, Routes);

        return _possibleConstructorReturn(this, (Routes.__proto__ || Object.getPrototypeOf(Routes)).call(this, config));
    }

    /**
     * Set the current route.
     * This will set the current route to either model, collection,
     * or any to make appropriate requests
     * Can also be changed by calling rapid.model.func() or rapid.collection.func()
     *
     * @param route The route to set
     */


    _createClass(Routes, [{
        key: 'setCurrentRoute',
        value: function setCurrentRoute(route) {
            this.currentRoute = route;
        }

        /**
         * Set the routes for the URL based off model/collection and config
         *
         * @param route The key of the route to be set
         */

    }, {
        key: 'setRoute',
        value: function setRoute(route) {
            var newRoute = '';
            var formattedRoute = {
                model: this.config.modelName,
                collection: (0, _pluralize2.default)(this.config.modelName),
                any: ''
            };

            if (this.config.routes[route] !== '') {
                newRoute = this.config.routes[route];
            } else {
                newRoute = (0, _lodash.kebabCase)(formattedRoute[route]).replace(/-/g, this.config.routeDelimeter);

                if (this.config.caseSensitive) {
                    newRoute = formattedRoute[route];
                }
            }

            this.routes[route] = newRoute;
        }

        /**
         * Loop through the routes and set them
         */

    }, {
        key: 'setRoutes',
        value: function setRoutes() {
            var _this2 = this;

            ['model', 'collection'].forEach(function (route) {
                return _this2.setRoute(route);
            });
        }
    }]);

    return Routes;
}(_Url3.default);

exports.default = Routes;