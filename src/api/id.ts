import { Rapid } from '../config/types';

export function createIdMethod(context: Rapid.Context) {
  return function id(modelId: Rapid.ModelId) {
    // prepend these params onto the url
    context.urlParams.unshift(modelId); // consider having an `id` attribute instead of params

    return context.api;
  };
}
