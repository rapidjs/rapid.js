'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CrudMixin = CrudMixin;

var _config = require('../../config');

function CrudMixin(Rapid) {
  Rapid.prototype.id = function id(modelId) {
    var params = [];

    if (this.config.primaryKey) {
      params = [this.config.primaryKey, modelId];
    } else {
      params = [modelId];
    }

    this.prepend(params);

    return this;
  };

  Rapid.prototype.create = function create(data) {
    return this.withParams(data).buildRequest(this.config.methods.create, this.config.suffixes.create);
  };

  Rapid.prototype.find = function find(id) {
    return this.model.id(id).get();
  };

  Rapid.prototype.updateOrDestroy = function updateOrDestroy(method) {
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

    if (method === _config.requestSuffixes.UPDATE) {
      this.withParams(data);
    }

    return this.model.buildRequest(this.config.methods[method], urlParams);
  };

  Rapid.prototype.update = function update() {
    for (var _len2 = arguments.length, params = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      params[_key2] = arguments[_key2];
    }

    return this.updateOrDestroy.apply(this, [_config.requestSuffixes.UPDATE].concat(params));
  };

  Rapid.prototype.destroy = function destroy() {
    for (var _len3 = arguments.length, params = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
      params[_key3] = arguments[_key3];
    }

    return this.updateOrDestroy.apply(this, [_config.requestSuffixes.DESTROY].concat(params));
  };

  Rapid.prototype.save = function save() {
    return this.update.apply(this, arguments);
  };

  Rapid.prototype.restore = function restore(id) {
    var urlParams = [];

    if (Number.isInteger(id)) {
      this.id(id);
    }

    if (Object.prototype.hasOwnProperty.call(this.config.suffixes, _config.requestSuffixes.RESTORE)) {
      urlParams.push(this.config.suffixes.restore);
    }

    return this.model.buildRequest(this.config.methods.restore, urlParams);
  };

  Rapid.prototype.all = function all() {
    return this.collection.get();
  };

  Rapid.prototype.findBy = function findBy(key, value) {
    var urlParams = [key];

    if (value) {
      urlParams.push(value);
    }

    return this.get.apply(this, urlParams);
  };
}