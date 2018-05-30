import { createModel } from './helpers';

describe('The request functionality should work as expected', () => {
  it('should fire a afterRequest', () => {
    const callback = jest.fn();
    const Crab = createModel({
      modelName: 'Crab',
      baseURL: 'http://maryland.com/bay/',
      afterRequest() {
        callback();
      },
    });

    Crab.find(1);

    expect(callback.mock.calls.length).toBe(1);
  });

  it('should fire a beforeRequest', () => {
    const callback = jest.fn();
    const Crab = createModel({
      modelName: 'Crab',
      baseURL: 'http://maryland.com/bay/',
      beforeRequest() {
        callback();
      },
    });

    Crab.find(1);

    expect(callback.mock.calls.length).toBe(1);
  });

  it('should fire onError when an error occurs', () => {

  });
});
