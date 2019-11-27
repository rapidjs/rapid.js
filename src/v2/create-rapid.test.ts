import { createRapid } from './index';

describe('SomeModuleOrMethod', () => {
  it('should create a rapid instance', () => {
    const rapid = createRapid({
      modelName: 'user',
    });

    console.log(rapid); // eslint-disable-line

    expect(rapid).toBe(true);
  });
});
