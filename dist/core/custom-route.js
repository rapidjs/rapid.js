'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CustomRoute = function () {
  function CustomRoute() {
    var route = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, CustomRoute);

    this.route = Object.assign({
      url: '',
      type: 'get',
      name: ''
    }, route);

    this.config = Object.assign({
      routeParams: {}
    }, config);
  }

  _createClass(CustomRoute, [{
    key: 'replaceURLParams',
    value: function replaceURLParams() {
      var _this = this;

      var url = this.rawURL;

      if (this.urlParams.length && Object.keys(this.config.routeParams).length !== 0) {
        this.urlParams.forEach(function (param) {
          url = url.replace('{' + param + '}', _this.config.routeParams[param]);
        });
      }

      return url;
    }
  }, {
    key: 'urlParams',
    get: function get() {
      var params = this.rawURL.match(/{\s*[\w\.]+\s*}/g);

      if (params !== null) {
        return params.map(function (x) {
          return x.match(/[\w\.]+/)[0];
        });
      }

      return [];
    }
  }, {
    key: 'url',
    get: function get() {
      return this.replaceURLParams();
    }
  }, {
    key: 'rawURL',
    get: function get() {
      return this.route.url;
    }
  }, {
    key: 'name',
    get: function get() {
      return this.route.name;
    }
  }, {
    key: 'type',
    get: function get() {
      return this.route.type;
    }
  }]);

  return CustomRoute;
}();

exports.default = CustomRoute;