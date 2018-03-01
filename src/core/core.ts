import axios from 'axios';
import defaultsDeep from 'lodash/defaultsDeep';
import Defaults from './defaults';
import Debugger from './../debug/debugger';

class Core {
  protected config: Config;
  protected customRoutes: CustomRouteData[];
  protected currentRoute: Route;
  protected http: HttpAdapterInterface;
  protected requestData: RequestData;
  protected routes: Config['routes'];
  protected urlParams: any[];

  constructor(config: Config) {
    this.config = Object.assign({}, defaultsDeep(config, Defaults));
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

    this.defineCustomRoutes();

    // these can be called via 
    // this.use('api', {})
    this.initializeAPI();

    this.initializeDebugger();
  }

  /**
   * Fire the setters. This will make sure the routes are generated properly.
   * Consider if this is really even necessary
   */
  private fireSetters() {
    ['baseURL', 'modelName', 'routeDelimeter', 'caseSensitive'].forEach(setter => (this[setter] = this.config[setter]));
  }

  /**
   * Initialze the debugger if debug is set to true.
   */
  private initializeDebugger() {
    this.debugger = this.config.debug ? new Debugger(this) : false;
  }

  /**
   * Initialize the API.
   * consider making an adatper interface to talk to http methods
   */
  private initializeAPI() {
    const httpConfig = defaultsDeep({
      baseURL: this.config.baseURL.replace(/\/$/, '') 
    }, this.config.apiConfig);

    this.http = new this.config.http(httpConfig);
  }

  /**
   * Set up the custom routes if we have any
   */
  private defineCustomRoutes() {
    // if we have custom routes, set up a name:route mapping
    if (this.config.customRoutes.length) {
      this.config.customRoutes.forEach((route: CustomRouteData) => {
        this.customRoutes[route.name] = route;
      });
    }
  }

  /**
   * Resets the request data
   */
  protected resetRequestData() {
    this.requestData = {
      params: {},
      options: {},
    };
  }

  /**
   * Reset an URL params set from a relationship
   */
  protected resetURLParams() {
    this.urlParams = [];
  }

  /**
   * Getters
   */

  get collection() {
    this.currentRoute = Route.COLLECTION;

    return this;
  }

  get model() {
    this.currentRoute = Route.MODEL;

    return this;
  }

  get any() {
    this.currentRoute = Route.ANY;

    return this;
  }

  /**
   * Setters
   */

  set baseURL(url: string) { // make this an instance variable
    this.config.baseURL = this.sanitizeUrl(url); // do not modify config
    this.initializeAPI(); // why is this here?
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
