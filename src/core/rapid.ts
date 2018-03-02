/*!
  * Rapid.js
  * (c) 2018 Drew J Bartlett (https://drewjbartlett.com)
  * Released under the MIT License.
  */

/**
 * The inheritance of the classes
 *
 * Core            ---> Url
 * Url             ---> Request
 * Request         ---> Crud
 * Crud            ---> Rapid
 *
 */
import { Config } from '../declarations/config.d';
import Crud from './crud';

class Rapid extends Crud {
  constructor(config: Config) {
    super(config);
  }
}

export default Rapid;
