// @ts-check
export const warn = (message = '') => {
  const prefix = 'rapid.js';
  console.error(`[${prefix}]: ${message}`);
};
