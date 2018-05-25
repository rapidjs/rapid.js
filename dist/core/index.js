'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _init = require('./mixins/init');

var _url = require('./mixins/url');

var _request = require('./mixins/request');

var _crud = require('./mixins/crud');

var _customRoutes = require('./mixins/custom-routes');

var _debug = require('../utils/debug');

function Rapid(config) {
  if (process.env.NODE_ENV !== 'production' && !(this instanceof Rapid)) {
    (0, _debug.warn)('Rapid is a constructor and should be called with the `new` keyword');
  }

  this._init(config);
}

(0, _init.InitMixin)(Rapid);
(0, _url.UrlMixin)(Rapid);
(0, _request.RequestMixin)(Rapid);
(0, _crud.CrudMixin)(Rapid);
(0, _customRoutes.CustomRoutesMixin)(Rapid);

exports.default = Rapid;