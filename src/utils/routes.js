// @ts-check
import kebabCase from 'lodash/kebabCase';
import pluralize from 'pluralize';
import { routeTypes } from '../config';
import defaults from '../config/defaults';
/**
 * Build a formatted Route object for generateRoute
 *
 * @param {Object} config
 * @return {Object}
 */
export const buildFormattedRoute = config => ({
  [routeTypes.MODEL]: config.modelName,
  [routeTypes.COLLECTION]: pluralize(config.modelName),
  [routeTypes.ANY]: '',
});

/**
 * Format the raw route with kebabcase
 * and replace the '-' with a custom delimiter
 *
 * @param {string} routeName
 * @param {string} routeDelimeter
 * @return {string}
 */
export const formatRoute = (routeName, routeDelimeter = defaults.routeDelimeter) => kebabCase(routeName).replace(/-/g, routeDelimeter);

/**
 * Generates the routes for the URL based off model/collection and config
 * If we have this route defined, return that
 * If caseSensitive is set, return the cased model
 * Otherwise, format the route.
 *
 * @param {String} route The key of the route to be set
 * @param {Object} config The key of the route to be set
 * @return {string}
 */
export const generateRoute = (route, config) => {
  let newRoute = '';
  const formattedRoute = buildFormattedRoute(config);

  if (config.routes[route] !== '') {
    newRoute = config.routes[route];
  } else if (config.caseSensitive) {
    newRoute = formattedRoute[route];
  } else {
    newRoute = formatRoute(formattedRoute[route], config.routeDelimeter);
  }

  return newRoute;
};
