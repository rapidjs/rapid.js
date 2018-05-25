import stringify from 'qs-stringify';
import { warn } from '../utils/debug';
import { sanitizeUrl } from '../utils/url';
import { parseRequestData } from '../utils/request';

export default class {
  constructor(caller) {
    this.caller = caller;
    this.data = {};
    this.logEnabled = true;
  }

  fakeRequest(type, url) {
    const params = parseRequestData(type, this.caller.requestData, this.caller.config);
    const lastUrl = this.setLastUrl(type, url, ...params);

    this.setLastRequest(...arguments);

    if (this.logEnabled) {
      warn(`${this.caller.config.modelName} made a ${type.toUpperCase()} request (${lastUrl})`);
      warn(params);
    }

    this.caller.afterRequest({});

    return lastUrl;
  }

  setLastUrl(type, url, params = {}) {
    let lastUrl = '';

    if (['put', 'post', 'patch'].includes(type)) {
      lastUrl = sanitizeUrl([this.caller.config.baseURL, url].join('/'), this.caller.config.trailingSlash);
    } else {
      const urlParams = params.params;
      const stringified = urlParams ? `?${stringify(urlParams)}` : '';

      lastUrl = sanitizeUrl([this.caller.config.baseURL, url].join('/'), this.caller.config.trailingSlash) + stringified;
    }

    lastUrl = sanitizeUrl(lastUrl, this.caller.config.trailingSlash);

    this.data.lastUrl = lastUrl;

    return lastUrl;
  }

  setLastRequest(type, url, data = {}, options = {}) {
    this.data.lastRequest = {
      type,
      url,
      data,
      options,
    };
  }
}
