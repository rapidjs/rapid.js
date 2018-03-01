/*!
  * Rapid.js
  * (c) 2018 Drew J Bartlett (https://drewjbartlett.com)
  * Released under the MIT License.
  */

/**
 * The inheritance of the classes
 *
 * Core            ---> Url
 * Url             ---> Routes
 * Routes          ---> Request
 * Request         ---> Crud
 * Crud            ---> Rapid
 *
 */

import Crud from './crud';

class Rapid extends Crud {
  constructor (config) {
    super(config);
  }
}

export default Rapid;
