// @ts-check

import defaultsDeep from 'lodash/defaultsDeep';
import Defaults from '../config/defaults';

class Core {
  constructor(config) {
    this.config = Object.assign(defaultsDeep(config, Defaults));
    this.currentRoute = this.config.defaultRoute;
    this.customRoutes = [];
    this.requestData = {
      params: {},
      options: {},
    };
    this.routes = this.config.routes;
    this.urlParams = [];

    this.initialize();
  }
}

export default Core;
