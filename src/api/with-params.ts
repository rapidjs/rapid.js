import { Rapid } from '../config/types';

export function createWithParamsMethod(context: Rapid.Context) {
  return function withParams(params: object) {
    const { requestData } = context;

    requestData.params = params;

    return context.api;
  };
}
