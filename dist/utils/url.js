"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sanitizeUrl = (url = '', keepTrailingSlash = false) => {
    url = url.replace(/([^:]\/)\/+/g, '$1').replace(/\?$/, '').replace(/^(\/\/)/, '/');
    if (!keepTrailingSlash) {
        url = url.replace(/\/$/, '');
    }
    return url;
};
