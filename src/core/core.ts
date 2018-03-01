import axios from 'axios';
import defaultsDeep from 'lodash/defaultsDeep';
import Defaults from './defaults';
import Debugger from './../debug/debugger';
import Logger from './../debug/logger';
import store from '../store/index';

class Core {
  protected config: Config;
  protected customRoutes: any[];
  protected requestData: RequestData;
  protected routes: Config['routes'];
  protected urlParams: any[];

  constructor(config: Config) {
    this.config = Object.assign({}, defaultsDeep(config, Defaults));
    this.routes = this.config.routes;
    this.urlParams = [];
    this.customRoutes = [];
    this.requestData = {
      params: {},
      options: {},
    };

    this.initialize();
  }

  /**
   * Set any config overrides in this method when extending
   */
  boot() {}

  /**
   * Setup the all of properties.
   */
  initialize() {
    this.boot();

    this.fireSetters();

    store.commit('setCurrentRoute', this.config.defaultRoute);

    this.defineCustomRoutes();

    // these can be called via 
    // this.use('api', {})
    this.initializeAPI();

    this.initializeDebugger();

    this.initializeLogger();
  }

  /**
   * Fire the setters. This will make sure the routes are generated properly.
   * Consider if this is really even necessary
   */
  fireSetters() {
    ['baseURL', 'modelName', 'routeDelimeter', 'caseSensitive'].forEach(setter => (this[setter] = this.config[setter]));
  }

  /**
   * Initialze the debugger if debug is set to true.
   */
  initializeDebugger() {
    this.debugger = this.config.debug ? new Debugger(this) : false;
  }

  /**
   * Initialize the API.
   */
  initializeAPI() {
    this.api = axios.create(defaultsDeep({ baseURL: this.config.baseURL.replace(/\/$/, '') }, this.config.apiConfig));
  }

  /**
   * Set up the custom routes if we have any
   */
  defineCustomRoutes() {
    // if we have custom routes, set up a name:route mapping
    if (this.config.customRoutes.length) {
      this.config.customRoutes.forEach((route) => {
        this.customRoutes[route.name] = route;
      });
    }
  }

  /**
   * Resets the request data
   */
  resetRequestData() {
    this.requestData = {
      params: {},
      options: {},
    };
  }

  /**
   * Reset an URL params set from a relationship
   */
  resetURLParams() {
    this.urlParams = [];
  }

  /**
   * Setters and Getters
   */

  get collection() {
    store.commit('setCurrentRoute', 'collection');

    return this;
  }

  get model() {
    store.commit('setCurrentRoute', 'model');

    return this;
  }

  get any() {
    store.commit('setCurrentRoute', 'any');

    return this;
  }

  set baseURL(url: string) {
    this.config.baseURL = this.sanitizeUrl(url);
    this.initializeAPI();
  }

  set modelName(val: string) {
    this.config.modelName = val;
    this.setRoutes();
  }

  set routeDelimeter(val: string) {
    this.config.routeDelimeter = val;
    this.setRoutes();
  }

  set caseSensitive(val: string) {
    this.config.caseSensitive = val;
    this.setRoutes();
  }
}

export default Core;
