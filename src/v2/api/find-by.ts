import { Rapid } from '../config/types';

export function createFindByMethod(context: Rapid.Context) {
  return function findBy(key: Rapid.ModelId, value: Rapid.ModelId) {
    const {
      internals: { makeRequest },
    } = context;

    return makeRequest({});
  };
}
