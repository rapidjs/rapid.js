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

import Crud from './crud';

class Rapid extends Crud {
  constructor(config) {
    super(config);
  }
}

export default Rapid;
