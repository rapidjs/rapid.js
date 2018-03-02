"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _request = _interopRequireDefault(require("./request"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Crud =
/*#__PURE__*/
function (_Request) {
  _inherits(Crud, _Request);

  function Crud() {
    _classCallCheck(this, Crud);

    return _possibleConstructorReturn(this, (Crud.__proto__ || Object.getPrototypeOf(Crud)).apply(this, arguments));
  }

  _createClass(Crud, [{
    key: "find",

    /**
     * Model Only Functions
     */

    /**
     * Make a GET request to a url that would retrieve a single model.
     * Prepends primaryKey if set
     *
     * @param {Number} id The model's id
     * @return {Promise}
     */
    value: function find(id) {
      return this.model.id(id).get();
    }
    /**
     * Make a request to update or destroy a model
     *
     * @param {String} method The method (update or destroy)
     * @param {Spread} params Can be either (id, data) OR (data)
     * @return {Promise}
     */

  }, {
    key: "updateOrDestroy",
    value: function updateOrDestroy(method) {
      var urlParams = [];

      for (var _len = arguments.length, params = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        params[_key - 1] = arguments[_key];
      }

      var id = params[0];
      var data = params[1];

      if (Number.isInteger(id)) {
        this.id(id);
      } else {
        data = params[0];
      }

      if (Object.prototype.hasOwnProperty.call(this.config.suffixes, method)) {
        urlParams.push(this.config.suffixes[method]);
      }

      if (method === 'update') {
        this.withParams(data);
      }

      return this.model.buildRequest(this.config.methods[method], urlParams);
    }
    /**
     * See updateOrDestroy
     *
     * @param {Spread} params
     * @return {Promise}
     */

  }, {
    key: "update",
    value: function update() {
      for (var _len2 = arguments.length, params = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        params[_key2] = arguments[_key2];
      }

      return this.updateOrDestroy.apply(this, ['update'].concat(params));
    }
    /**
     * Alias of update
     * See updateOrDestroy
     *
     * @param {Spread} params
     * @return {Promise}
     */

  }, {
    key: "save",
    value: function save() {
      return this.update.apply(this, arguments);
    }
    /**
     * See updateOrDestroy
     *
     * @param {Spread} params
     * @return {Promise}
     */

  }, {
    key: "destroy",
    value: function destroy() {
      for (var _len3 = arguments.length, params = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        params[_key3] = arguments[_key3];
      }

      return this.updateOrDestroy.apply(this, ['destroy'].concat(params));
    }
    /**
     * Sends a config.suffixes.restore request to emulate a
     * restore request
     *
     * @param {Number} id
     * @return {Promise}
     */

  }, {
    key: "restore",
    value: function restore(id) {
      var urlParams = [];

      if (Number.isInteger(id)) {
        this.id(id);
      }

      if (Object.prototype.hasOwnProperty.call(this.config.suffixes, 'restore')) {
        urlParams.push(this.config.suffixes.restore);
      }

      return this.model.buildRequest(this.config.methods.restore, urlParams);
    }
    /**
     * Makes a request to create a new model based off the method and suffix for create
     *
     * @param {Object} data The data to be sent over for creation of model
     * @return {Promise}
     */

  }, {
    key: "create",
    value: function create(data) {
      return this.withParams(data).buildRequest(this.config.methods.create, this.config.suffixes.create);
    }
    /**
     * This sets an id for a request
     * currently it doens't work with any of the CRUD methods.
     * It should work with this.
     *
     * @param {Number} id The id of the model
     * @return {Promise}
     */

  }, {
    key: "id",
    value: function id(_id) {
      var params = []; // this is checking if primaryKey is true, not if it exists

      if (this.config.primaryKey) {
        params = [this.config.primaryKey, _id];
      } else {
        params = [_id];
      } // needs to prepend


      this.prepend(params);
      return this;
    }
    /**
     * Collection Only Functions
     */

    /**
     * Makes a GET request on a collection route
     *
     * @return {Promise}
     */

  }, {
    key: "all",
    value: function all() {
      return this.collection.get();
    }
    /**
     * Collection and Model functions
     */

    /**
     * Makes a GET request to find a model/collection by key, value
     *
     * @param {String|Number} key The key to search by
     * @param {String|Number} value The value to search by
     * @return {Promise}
     */

  }, {
    key: "findBy",
    value: function findBy(key, value) {
      var urlParams = [key];

      if (value) {
        urlParams.push(value);
      }

      return this.get.apply(this, urlParams);
    }
  }]);

  return Crud;
}(_request.default);

var _default = Crud;
exports.default = _default;