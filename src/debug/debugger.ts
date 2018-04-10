import qs from 'qs';
//import Caller from './caller';
import Data from './data';
import { RequestType } from '../typings/request';
//import Core from './../core/core';

// TODO: caller should be better typed
export default class {
  private data: Data;
  private logEnabled: boolean;

  constructor (private caller) {
    this.caller = caller;
    this.data = {};
    this.logEnabled = true;
  }

  fakeRequest (type: RequestType, url: string) {
    const params = this.caller.parseRequestData(type);
    const lastUrl = this.setLastUrl(type, url, ...params);

    // bug: https://github.com/Microsoft/TypeScript/issues/4130
    //this.setLastRequest(...arguments);
    this.setLastRequest(type, url);

    if (this.logEnabled) {
      this.caller.logger.debug(`${this.caller.config.modelName} made a ${type.toUpperCase()} request (${lastUrl})`);
      this.caller.logger.log(params);
    }

    this.caller.afterRequest({});

    return lastUrl;
  }

  setLastUrl (type, url, params = {params: {}}) {
    let lastUrl = '';

    if (['put', 'post', 'patch'].includes(type)) {
      lastUrl = this.caller.sanitizeUrl([this.caller.config.baseURL, url].join('/'));
    } else {
      const urlParams = params.params;
      const stringified = urlParams ? `?${qs.stringify(urlParams)}` : '';

      lastUrl = this.caller.sanitizeUrl([this.caller.config.baseURL, url].join('/')) + stringified;
    }

    lastUrl = this.caller.sanitizeUrl(lastUrl);

    this.data.lastUrl = lastUrl;

    return lastUrl;
  }

  setLastRequest (type: RequestType, url: string, data = {}, options = {}) {
    this.data.lastRequest = {
      type,
      url,
      data,
      options,
    };
  }
}
