// @ts-check

import defaultsDeep from 'lodash/defaultsDeep';
import Core from './core';

class Request extends Core {
  constructor(config) {
    super(config);

    this.applyCallableRequestMethods();
  }
}

export default Request;
