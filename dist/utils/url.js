export const sanitizeUrl = (url = '', keepTrailingSlash = false) => {
    url = url.replace(/([^:]\/)\/+/g, '$1').replace(/\?$/, '').replace(/^(\/\/)/, '/');
    if (!keepTrailingSlash) {
        url = url.replace(/\/$/, '');
    }
    return url;
};
