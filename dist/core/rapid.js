"use strict";
/*!
  * Rapid.js
  * (c) 2018 Drew J Bartlett (https://drewjbartlett.com)
  * Released under the MIT License.
  */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const crud_1 = __importDefault(require("./crud"));
class Rapid extends crud_1.default {
    constructor(config) {
        super(config);
    }
}
exports.default = Rapid;
