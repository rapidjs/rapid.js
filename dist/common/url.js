'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.sanitizeUrl = sanitizeUrl;
/**
 * This just makes sure there are no double slashes and no trailing
 * slash unless the config for it is set.
 *
 * @param {String} url a url to sanitize
 * @param {Boolean} keepTrailingSlash a url to sanitize
 * @return {String}
 */
function sanitizeUrl() {
    var url = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    var keepTrailingSlash = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

    url = url.replace(/([^:]\/)\/+/g, '$1').replace(/\?$/, '');

    if (!keepTrailingSlash) {
        url = url.replace(/\/$/, '');
    }

    return url;
}

exports.default = {
    sanitizeUrl: sanitizeUrl
};