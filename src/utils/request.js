import defaultsDeep from 'lodash/defaultsDeep';
import { requestTypes } from '../config';
import { warn } from '../utils/debug';

/**
 * Parse the request data prior to passing it to the http service
 *
 * @param {String} requestType
 * @param {Object} requestData
 * @param {Object} config
 * @return {Object}
 */
export const parseRequestData = (requestType, requestData, config) => {
  const parsedRequestData = [];
  const { options } = requestData;
  let { params } = requestData;

  // axios handles the options differently for the request type
  if ([requestTypes.PUT, requestTypes.POST, requestTypes.PATCH].includes(requestType)) {
    params = defaultsDeep(params, config.globalParameters);
    parsedRequestData.push(params);
    parsedRequestData.push(options);
  } else {
    options.params = defaultsDeep(params, config.globalParameters);
    parsedRequestData.push(options);
  }

  return parsedRequestData;
};

/**
 * Checks if is a valid request type
 *
 * @param {String} requestType
 * @param {Object} config
 * @return {Boolean}
 */
export const isAllowedRequestType = (requestType, config) => {
  if (!config.allowedRequestTypes.includes(requestType)) {
    if (config.debug) {
      warn(`'${requestType}' is not included in allowedRequestTypes: [${config.allowedRequestTypes.join(', ')}]`);
    }

    return false;
  }

  return true;
};

