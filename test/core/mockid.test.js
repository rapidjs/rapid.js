import { Mockid } from '../debug/mockid';
import Rapid from '../../src/core';

describe('Mockid', () => {
  describe('foo', () => {
    it('foobar', () => {
      const mockHttp = new Mockid();

      const rapid = new Rapid({
        http: mockHttp,
        modelName: 'mock',
      });

      mockHttp.install(rapid);

      rapid.get('/foobar')
        .then(response => {
          expect(response.url).toBe('api/mock/foobar');
        });
    });
  });
});
