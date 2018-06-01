// @ts-check
import defaults from '../config/defaults';

const defaultResponse = {
  data: {},
  status: 200,
  statusText: 'OK',
  headers: {},
  config: {},
  request: {},
};

function fakeRequest(requestType, url, requestConfig, respondWith = defaultResponse) {
  return {
    requestType,
    url,
    requestConfig,
    response: Object.assign(defaultResponse, respondWith),
  };
}

/**
 * Prepend baseUrl from config onto url
 *
 * @param {Mockid} instance
 * @param {string} url
 * @return {string}
 */
function prepareUrl(instance, url) {
  return [instance.config.baseURL, url].filter(Boolean).join('/');
}

function _applyCallableRequestMethods(instance) {
  defaults.allowedRequestTypes.forEach(requestType => {
    instance[requestType] = (url, ...requestData) => new Promise(resolve => {
      instance.config.beforeRequest();

      resolve(fakeRequest(requestType, prepareUrl(instance, url), ...requestData));
    });
  });
}

export class Mockid {
  constructor(config = {}) {
    this.config = config;
  }

  install(instance) {
    this.config = instance.config;

    _applyCallableRequestMethods(this);
  }
}
