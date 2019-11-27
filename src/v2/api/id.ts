import { Rapid } from '../config/types';

export function createIdMethod(context: Rapid.Context) {
  return function id(modelId: Rapid.ModelId) {
    const { config } = context;

    const params: Rapid.ModelId[] = [modelId];

    if (config.primaryKey) {
      params.unshift(config.primaryKey);
    }

    // prepend these params onto the url
    context.urlParams = params.concat(context.urlParams);

    return context.api;
  };
}
