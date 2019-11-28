import { Rapid } from '../config/types';

export function createFindByMethod(context: Rapid.Context) {
  return function findBy(key: Rapid.ModelId, value: Rapid.ModelId) {
    const { api, urlParams } = context;

    urlParams.push(key, value);

    return api.get({});
  };
}
