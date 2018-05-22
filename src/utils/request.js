import defaultsDeep from 'lodash/defaultsDeep';
import { requestTypes } from '../config';

/**
 * Parse the request data prior to passing it to the http service
 *
 * @param {String} requestType The request type
 * @param {Object} requestData The request type
 * @param {Object} config The request type
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
