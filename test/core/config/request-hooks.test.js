import { createRapid } from '../helpers';

describe('Request Hooks', () => {
  describe('beforeRequest', () => {
    const beforeCallback = jest.fn();

    const Crab = createRapid({
      modelName: 'Crab',
      baseURL: 'http://maryland.com/bay/',
      beforeRequest() {
        beforeCallback();
      },
    });

    it('should fire a beforeRequest', () => {
      Crab.find(1).then(() => {
        expect(beforeCallback.mock.calls.length).toBe(1);
      }).catch(err => console.log(err)); // eslint-disable-line);
    });
  });

  describe('afterRequest', () => {
    const afterCallback = jest.fn();

    const Crab = createRapid({
      modelName: 'Crab',
      baseURL: 'http://maryland.com/bay/',
      afterRequest() {
        afterCallback();
      },
    });

    it('should fire the callback after the request has been made', () => {
      Crab.find(1).then(() => {
        expect(afterCallback.mock.calls.length).toBe(1);
      });
    });
  });

  describe('onError', () => {
    const onErrorCallback = jest.fn();

    const Crab = createRapid({
      modelName: 'Crab',
      baseURL: 'http://maryland.com/bay/',
      onError() {
        onErrorCallback();
      },
    });

    it('should call the onError callback if an error has been made', () => {
      Crab.rejection().then(() => {
        expect(onErrorCallback.mock.calls.length).toBe(1);
      });
    });
  });
});
