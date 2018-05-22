import Rapid from './../src/rapid';
import Auth from './../src/auth';

/**
 * Create an auth model for testing
 * @param {Object} config
 * @return {Rapid}
 */
export function createAuthModel(config) {
  const auth = new Auth(Object.assign(config, { debug: true }));
  auth.debugger.logEnabled = false;

  return auth;
}

/**
 * Create a model for testing
 * @param {Object} config
 * @return {Rapid}
 */
export function createModel(config) {
  const auth = new Rapid(Object.assign(config, { debug: true }));
  auth.debugger.logEnabled = false;

  return auth;
}

export default {
  createAuthModel,
  createModel,
};
