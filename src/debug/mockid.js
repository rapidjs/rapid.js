import defaults from '../config/defaults';

function fakeRequest(requestType, url, requestData, respondWith) {
  return {
    requestType, url, requestData, response: respondWith,
  };
}

function _applyCallableRequestMethods(instance) {
  defaults.allowedRequestTypes.forEach(requestType => {
    instance[requestType] = (url, ...requestData) => new Promise(resolve => {
      resolve(fakeRequest(requestType, url, ...requestData));
    });
  });
}

export class Mockid {
  constructor(config = {}) {
    this.config = config;

    _applyCallableRequestMethods(this);
  }
}
