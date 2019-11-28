import { Rapid } from '../config/types';

export function createFindMethod(context: Rapid.Context) {
  return function find(id: Rapid.ModelId) {
    const { api } = context;

    return api.id(id).get({});
  };
}
