'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _request = require('./request');

var _request2 = _interopRequireDefault(_request);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Crud = function (_Request) {
  _inherits(Crud, _Request);

  function Crud() {
    _classCallCheck(this, Crud);

    return _possibleConstructorReturn(this, (Crud.__proto__ || Object.getPrototypeOf(Crud)).apply(this, arguments));
  }

  _createClass(Crud, [{
    key: 'find',
    value: function find(id) {
      return this.model.id(id).get();
    }
  }, {
    key: 'updateOrDestroy',
    value: function updateOrDestroy(method) {
      var urlParams = [];

      for (var _len = arguments.length, params = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
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
  }, {
    key: 'update',
    value: function update() {
      for (var _len2 = arguments.length, params = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        params[_key2] = arguments[_key2];
      }

      return this.updateOrDestroy.apply(this, ['update'].concat(params));
    }
  }, {
    key: 'save',
    value: function save() {
      return this.update.apply(this, arguments);
    }
  }, {
    key: 'destroy',
    value: function destroy() {
      for (var _len3 = arguments.length, params = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        params[_key3] = arguments[_key3];
      }

      return this.updateOrDestroy.apply(this, ['destroy'].concat(params));
    }
  }, {
    key: 'restore',
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
  }, {
    key: 'create',
    value: function create(data) {
      return this.withParams(data).buildRequest(this.config.methods.create, this.config.suffixes.create);
    }
  }, {
    key: 'id',
    value: function id(_id) {
      var params = [];

      if (this.config.primaryKey) {
        params = [this.config.primaryKey, _id];
      } else {
        params = [_id];
      }

      this.prepend(params);

      return this;
    }
  }, {
    key: 'all',
    value: function all() {
      return this.collection.get();
    }
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
}(_request2.default);

exports.default = Crud;