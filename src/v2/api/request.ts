import { Rapid } from "../config/types";

export function createRequestMethod(
  context: Rapid.Context,
  requestType: Rapid.RequestType
) {
  return function createRequestMethod() {
    const {
      internals: { makeRequest }
    } = context;

    return makeRequest({
      type: requestType
    });
  };
}
