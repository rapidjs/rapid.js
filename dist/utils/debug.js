"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.warn = (message) => {
    const prefix = 'rapid.js';
    console.error(`[${prefix}]: ${message}`);
};
