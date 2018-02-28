import kebabCase from 'lodash/kebabCase';
import pluralize from 'pluralize';
import Url from './url';

class Routes extends Url {

  constructor (config) {
    super(config);
  }

  /**
   * Set the routes for the URL based off model/collection and config
   *
   * @param {String} route The key of the route to be set
   */
  setRoute (route) {
    let newRoute = '';
    const formattedRoute = {
      model: this.config.modelName,
      collection: pluralize(this.config.modelName),
      any: '',
    };

    if (this.config.routes[route] !== '') {
      newRoute = this.config.routes[route];
    } else {
      newRoute = kebabCase(formattedRoute[route]).replace(/-/g, this.config.routeDelimeter);

      if (this.config.caseSensitive) {
        newRoute = formattedRoute[route];
      }
    }

    this.routes[route] = newRoute;
  }

  /**
   * Loop through the routes and set them
   */
  setRoutes () {
    ['model', 'collection'].forEach(route => this.setRoute(route));
  }
}

export default Routes;
