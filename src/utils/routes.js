import kebabCase from 'lodash/kebabCase';
import pluralize from 'pluralize';

/**
 * Generates the routes for the URL based off model/collection and config
 *
 * @param {String} route The key of the route to be set
 * @param {Object} config The key of the route to be set
 * @return {string}
 */
export const generateRoute = (route, config) => {
  let newRoute = '';
  const formattedRoute = {
    model: config.modelName,
    collection: pluralize(config.modelName),
    any: '',
  };

  if (config.routes[route] !== '') {
    newRoute = config.routes[route];
  } else {
    newRoute = kebabCase(formattedRoute[route]).replace(/-/g, config.routeDelimeter);

    if (config.caseSensitive) {
      newRoute = formattedRoute[route];
    }
  }

  return newRoute;
};
