/*!
  * Rapid.js
  * (c) 2018 Drew J Bartlett (https://drewjbartlett.com)
  * Released under the MIT License.
  */
import { Config } from './config';
import Crud from './crud';
declare class Rapid extends Crud {
    constructor(config: Config);
}
export default Rapid;
