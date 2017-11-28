'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _crud = require('./crud');

var _crud2 = _interopRequireDefault(_crud);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*!
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 * Rapid.js v0.0.14
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 * (c) 2017 Drew J Bartlett (https://drewjbartlett.com)
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 * Released under the MIT License.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 */

/**
 * The inheritance of the classes
 *
 * Core            ---> Url
 * Url             ---> Routes
 * Routes          ---> Request
 * Request         ---> Relationships
 * Relationships   ---> Crud
 * Crud            ---> Rapid
 *
 */

var Rapid = function (_Crud) {
    _inherits(Rapid, _Crud);

    function Rapid(config) {
        _classCallCheck(this, Rapid);

        return _possibleConstructorReturn(this, (Rapid.__proto__ || Object.getPrototypeOf(Rapid)).call(this, config));
    }

    return Rapid;
}(_crud2.default);

exports.default = Rapid;