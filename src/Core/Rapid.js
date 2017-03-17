/*!
  * Rapid.js v0.0.1
  * (c) 2017 Drew J Bartlett (http://drewjbartlett.com)
  * Released under the MIT License.
  */


/**
 * The inheritance of the classes
 *
 * Core            ---> Url
 * Url             ---> Routes
 * Routes          ---> Request
 * Request         ---> Relationships
 * Relationships   ---> Crud
 * Crud            ---> Rapid
 *
 */

import Crud from './Crud';

class Rapid extends Crud {

    constructor (config) {
        super(config);
    }

}

export default Rapid;
