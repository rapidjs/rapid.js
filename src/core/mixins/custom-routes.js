// @ts-check
import CustomRoute from '../custom-route';
import { makeUrl } from '../../utils/url';

/**
 * Custom Routes
 *
 * These can be defined and passed via the customRoutes config attribute.
 * This allows you to completely override Rapid's usual functionality
 * and use this more like a router.
 */

export function CustomRoutesMixin(Rapid) {
  /**
   * Make a request to a route via a given route name
   * The request type depends on the type of request defined in the route
   *
   * @param {String} name
   * @param {Object} routeParams
   * @param {Object} requestParams
   * @return {Promise}
   */
  Rapid.prototype.route = function route(name = '', routeParams = {}, requestParams = {}) {
    const customRoute = this.getCustomRoute(name, routeParams);

    // if there are request params, set them
    if (Object.keys(requestParams).length !== 0) {
      this.withParams(requestParams);
    }

    return this.request(customRoute.type, customRoute.url);
  };

  /**
   * Get a CustomRoute via given name
   *
   * @param {String} name
   * @param {Object} routeParams
   * @return {CustomRoute}
   */
  Rapid.prototype.getCustomRoute = function getCustomRoute(name = '', routeParams = {}) {
    // if a route exists, return a new instance of CustomRoute
    if (Object.prototype.hasOwnProperty.call(this.customRoutes, name)) {
      return new CustomRoute(this.customRoutes[name], {
        routeParams,
      });
    }

    // to prevent having undefined
    return new CustomRoute();
  };

  /**
   * Generate a url to a custom defined route
   * This applies the baseURL and the trailing slash config
   * as well
   *
   * @param {String} name
   * @param {Object} routeParams
   * @return {String}
   */
  Rapid.prototype.generate = function generate(name = '', routeParams = {}) {
    const { url } = this.getCustomRoute(name, routeParams);

    return url !== '' ? makeUrl(this, this.config.baseURL, url) : '';
  };
}
