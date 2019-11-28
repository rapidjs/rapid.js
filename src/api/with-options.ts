import { Rapid } from '../config/types';

export function createWithOptionsMethod(context: Rapid.Context) {
  return function withOptions(options: object) {
    const { requestData } = context;

    requestData.options = options;

    return context.api;
  };
}
