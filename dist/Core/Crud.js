'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Request2 = require('./Request');

var _Request3 = _interopRequireDefault(_Request2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * All the CRUD
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var Crud = function (_Request) {
    _inherits(Crud, _Request);

    function Crud() {
        _classCallCheck(this, Crud);

        return _possibleConstructorReturn(this, (Crud.__proto__ || Object.getPrototypeOf(Crud)).apply(this, arguments));
    }

    _createClass(Crud, [{
        key: 'find',

        /**
         * Model Only Functions
         */

        /**
         * Make a GET request to a url that would retrieve a single model.
         * Prepends primaryKey if set
         *
         * @param id The model's id
         */
        value: function find(id) {
            return this.model.id(id).get();
        }

        /**
         * Make a request to update or destroy a model
         *
         * @param method The method (update or destroy)
         * @param ...params Can be either (id, data) OR (data)
         */

    }, {
        key: 'updateOrDestroy',
        value: function updateOrDestroy(method) {
            var urlParams = [],
                id = arguments.length <= 1 ? undefined : arguments[1],
                data = arguments.length <= 2 ? undefined : arguments[2];

            if (Number.isInteger(id)) {
                this.id(id);
            } else {
                data = arguments.length <= 1 ? undefined : arguments[1];
            }

            if (this.config.suffixes[method]) {
                urlParams.push(this.config.suffixes[method]);
            }

            if (method == 'update') {
                this.withParams(data);
            }

            return this.model.buildRequest(this.config.methods[method], urlParams);
        }

        /**
         * See updateOrDestroy
         */

    }, {
        key: 'update',
        value: function update() {
            for (var _len = arguments.length, params = Array(_len), _key = 0; _key < _len; _key++) {
                params[_key] = arguments[_key];
            }

            return this.updateOrDestroy.apply(this, ['update'].concat(params));
        }

        /**
         * Alias of update
         * See updateOrDestroy
         */

    }, {
        key: 'save',
        value: function save() {
            return this.update.apply(this, arguments);
        }

        /**
         * See updateOrDestroy
         */

    }, {
        key: 'destroy',
        value: function destroy() {
            for (var _len2 = arguments.length, params = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                params[_key2] = arguments[_key2];
            }

            return this.updateOrDestroy.apply(this, ['destroy'].concat(params));
        }

        /**
         * Makes a request to create a new model based off the method and suffix for create
         *
         * @param data The data to be sent over for creation of model
         */

    }, {
        key: 'create',
        value: function create(data) {
            return this.withParams(data).buildRequest(this.config.methods.create, this.config.suffixes.create);
        }

        /**
         * This sets an id for a request
         * currently it doens't work with any of the CRUD methods.
         * It should work with this.
         *
         * @param id The id of the model
         */

    }, {
        key: 'id',
        value: function id(_id) {
            var params = [];

            if (this.config.primaryKey) {
                params = [this.config.primaryKey, _id];
            } else {
                params = [_id];
            }

            // needs to prepend
            this.prepend(params);

            return this;
        }

        /**
         * Collection Only Functions
         */

        /**
         * Makes a GET request on a collection route
         */

    }, {
        key: 'all',
        value: function all() {
            return this.collection.get();
        }

        /**
         * Collection and Model functions
         */

        /**
         * Makes a GET request to find a model/collection by key, value
         *
         * @param key The key to search by
         * @param value The value to search by
         */

    }, {
        key: 'findBy',
        value: function findBy(key, value) {
            var urlParams = [key];

            if (value) {
                urlParams.push(value);
            }

            return this.get.apply(this, urlParams);
        }
    }]);

    return Crud;
}(_Request3.default);

exports.default = Crud;