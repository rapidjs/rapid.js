import { Mockid } from '../../src/debug/mockid';
import Rapid from '../../src/core';

// /**
//  * Create an auth model for testing
//  * @param {Object} config
//  * @return {Rapid}
//  */
// export const createAuthModel = config => {
//   const auth = new Auth(Object.assign(config, { debug: true }));
//   auth.debugger.logEnabled = false;

//   return auth;
// };

/**
 * Create a model for testing
 * @param {Object} config
 * @return {Rapid}
 */
export const createModel = config => {
  const auth = new Rapid(Object.assign(config, { debug: true }));
  auth.debugger.logEnabled = false;

  return auth;
};

export const createRapid = config => {
  const mockHttp = new Mockid();
  const mockModel = new Rapid(Object.assign(config, { http: mockHttp }));

  mockHttp.install(mockModel);

  return mockModel;
};
