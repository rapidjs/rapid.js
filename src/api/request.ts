import { Rapid } from '../config/types';

export function createRequestMethod(context: Rapid.Context, requestType: Rapid.RequestType) {
  return function request(params) {
    const {
      internals: { buildRequest },
    } = context;

    return buildRequest(requestType, params);
  };
}
