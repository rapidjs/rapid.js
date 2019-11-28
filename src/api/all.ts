import { Rapid } from '../config/types';

export function createAllMethod(context: Rapid.Context) {
  return function all() {
    const { api } = context;

    return api.get({});
  };
}
