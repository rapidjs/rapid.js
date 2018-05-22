import stringify from 'qs-stringify';
import { warn } from '../utils/debug';

export default class {
  constructor(caller) {
    this.caller = caller;
    this.data = {};
    this.logEnabled = true;
  }

  fakeRequest(type, url) {
    const params = this.caller.parseRequestData(type);
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
      lastUrl = this.caller.sanitizeUrl([this.caller.config.baseURL, url].join('/'));
    } else {
      const urlParams = params.params;
      const stringified = urlParams ? `?${stringify(urlParams)}` : '';

      lastUrl = this.caller.sanitizeUrl([this.caller.config.baseURL, url].join('/')) + stringified;
    }

    lastUrl = this.caller.sanitizeUrl(lastUrl);

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
