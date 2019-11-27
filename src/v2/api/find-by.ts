import { Rapid } from '../config/types';

export function createFindByMethod(context: Rapid.Context) {
  return function findBy(key: Rapid.ModelId, value: Rapid.ModelId) {
    const { api } = context;
    const urlParams = [key];

    if (value) {
      urlParams.push(value);
    }

    return api.get();
  };
}
