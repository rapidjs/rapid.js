'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _lodash = require('lodash.isarray');

var _lodash2 = _interopRequireDefault(_lodash);

var _Request2 = require('./Request');

var _Request3 = _interopRequireDefault(_Request2);

var _lodash3 = require('lodash.camelcase');

var _lodash4 = _interopRequireDefault(_lodash3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Relationship Methods
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var Relationships = function (_Request) {
    _inherits(Relationships, _Request);

    function Relationships(config) {
        _classCallCheck(this, Relationships);

        return _possibleConstructorReturn(this, (Relationships.__proto__ || Object.getPrototypeOf(Relationships)).call(this, config));
    }

    /**
     * Sets up a hasOne relationship
     * See hasRelationship
     */


    _createClass(Relationships, [{
        key: 'hasOne',
        value: function hasOne(relation, primaryKey, foreignKey) {
            return this.hasRelationship('hasOne', relation, primaryKey, foreignKey);
        }

        /**
         * Sets up a hasMany relationship
         * See hasRelationship
         */

    }, {
        key: 'hasMany',
        value: function hasMany(relation, primaryKey, foreignKey) {
            return this.hasRelationship('hasMany', relation, primaryKey, foreignKey);
        }

        /**
         * Registers a relationship via the boot() method when extending a model
         *
         * @param type The type of relationship
         * @param relation The relation name OR object
         */

    }, {
        key: 'registerHasRelation',
        value: function registerHasRelation(type, relation) {
            var _this2 = this;

            var relationRoute = this.getRouteByRelationType(type, relation),
                relationName = this.getRelationshipName(type, relation);

            this.$rels[relationName] = function (type, route) {
                return function (primaryKey, foreignKey) {
                    return _this2.hasRelationship(type, route, primaryKey, foreignKey);
                };
            }(type, relationRoute);

            // add to methodRoutes for debugging
            this.methodRoutes.push(relationRoute);

            return this;
        }

        /**
         * Register a "has" Relationship
         *
         * @param type The type of 'has' Relationship (hasOne, hasMany)
         * @param relation The relation. A string or Rapid model
         * @param primaryKey The primaryKey of the relationship
         * @param foreignKey The foreignKey of the relationship
         */

    }, {
        key: 'hasRelationship',
        value: function hasRelationship(type) {
            var relation = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
            var primaryKey = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
            var foreignKey = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '';

            var urlParams = [];

            relation = this.getRouteByRelationType(type, relation);

            /**
             * No longer do we need to make ...foreignKey an array because we can do .get() ??
             * does that make sense?
             */
            if ((0, _lodash2.default)(foreignKey)) {
                urlParams = [primaryKey, relation].concat(_toConsumableArray(foreignKey));
            } else {
                urlParams = [primaryKey, relation, foreignKey];
            }

            this.setURLParams(urlParams, false, true);

            return this;
        }

        /**
         * Sets up a belongsTo relationship
         * See belongsToRelationship
         */

    }, {
        key: 'belongsTo',
        value: function belongsTo(relation, foreignKey, foreignKeyName, after) {
            return this.belongsToRelationship('belongsTo', relation, foreignKey, foreignKeyName, after);
        }

        /**
         * Sets up a belongsToMany relationship
         * See belongsToRelationship
         */

    }, {
        key: 'belongsToMany',
        value: function belongsToMany(relation, foreignKey, foreignKeyName, after) {
            return this.belongsToRelationship('belongsToMany', relation, foreignKey, foreignKeyName, after);
        }

        /**
         * Registers a relationship via the boot() method when extending a model
         *
         * @param type The type of relationship
         * @param relation The relation name OR object
         */

    }, {
        key: 'registerBelongsTo',
        value: function registerBelongsTo(type, relation) {
            var _this3 = this;

            var relationRoute = this.getRouteByRelationType(type, relation),
                relationName = this.getRelationshipName(type, relation);

            this.$rels[relationName] = function (type, route) {
                return function (primaryKey, foreignKey, after) {
                    return _this3.belongsToRelationship(type, route, primaryKey, foreignKey, after);
                };
            }(type, relationRoute);

            // add to methodRoutes for debugging
            this.methodRoutes.push(relationRoute);

            return this;
        }

        /**
         * Register a "belongsTo" Relationship
         *
         * @param type The type of 'has' Relationship (hasOne, hasMany)
         * @param relation The relation. A string or Rapid model
         * @param foreignKey The foreignKey of the relationship
         * @param foreignKeyName The foreignKeyName of the relationship
         * @param after Anything to append after the relationship
         */

    }, {
        key: 'belongsToRelationship',
        value: function belongsToRelationship(type, relation, foreignKey, foreignKeyName, after) {
            relation = this.getRouteByRelationType(type, relation);

            var route = this.currentRoute,
                urlParams = [relation];

            if (foreignKeyName) {
                urlParams.push(foreignKeyName);
            }

            urlParams.push(foreignKey);
            urlParams.push(this.routes[route]);

            if ((0, _lodash2.default)(after)) {
                urlParams.push.apply(urlParams, _toConsumableArray(after));
            } else {
                urlParams.push(after);
            }

            this.setURLParams(urlParams, false, true);

            return this.any;
        }

        /**
         * Adds a relationship to the model when extending
         *
         * @param type The type of relationship ('hasOne', 'hasMany', 'belongsTo', 'belongsToMany')
         * @param relation The relationship either a Rapid model or string
         */

    }, {
        key: 'addRelationship',
        value: function addRelationship(type, relation) {
            var hasMethods = ['hasOne', 'hasMany'],
                belongsMethods = ['belongsTo', 'belongsToMany'];

            if (hasMethods.includes(type)) {
                this.registerHasRelation(type, relation);
            } else if (belongsMethods.includes(type)) {
                this.registerBelongsTo(type, relation);
            }
        }

        /**
         * This gets the route of the relationship if a relationship object
         * is passed rather than a string.
         *
         * @param type The type of relationship ('hasOne', 'hasMany', 'belongsTo', 'belongsToMany')
         * @param relation The relationship either a Rapid model or string
         */

    }, {
        key: 'getRouteByRelationType',
        value: function getRouteByRelationType(type, relation) {
            var relationRoute = relation,
                routes = {
                hasOne: 'model',
                hasMany: 'collection',
                belongsTo: 'model',
                belongsToMany: 'collection'
            };

            if ((typeof relation === 'undefined' ? 'undefined' : _typeof(relation)) == 'object') {
                relationRoute = relation.routes[routes[type]];

                this.rels[relationRoute] = relation;
            }

            return relationRoute;
        }
    }, {
        key: 'getRelationshipName',
        value: function getRelationshipName(type, relation) {
            return (0, _lodash4.default)(this.getRouteByRelationType(type, relation));
        }
    }]);

    return Relationships;
}(_Request3.default);

exports.default = Relationships;