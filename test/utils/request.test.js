import { parseRequestData } from '../../src/utils/request';


describe('Request Utils', () => {
  describe('parseRequestData', () => {
    it('should properly merge options, data, and global parameters for put, patch, and post requests', () => {
      const requestData = {
        options: { headers: { someHeaderOption: 'foo' } },
        params: { shooby: 'dooby', chimi: 'changa' },
      };

      const config = { globalParameters: { FOO: 'BAR' } };

      const expected = [
        { FOO: 'BAR', chimi: 'changa', shooby: 'dooby' },
        { headers: { someHeaderOption: 'foo' } },
      ];

      expect(parseRequestData('post', requestData, config)).toEqual(expected);
      expect(parseRequestData('put', requestData, config)).toEqual(expected);
      expect(parseRequestData('patch', requestData, config)).toEqual(expected);
    });

    it('should properly merge options, data, and global parameters for put, patch, and post requests with no global params', () => {
      const requestData = {
        options: { headers: { someHeaderOption: 'foo' } },
        params: { foo2: 'bar2', someArray: ['foo', 'bar'], 'some-object': { foo: 'bar' } },
      };

      const config = { globalParameters: {} };

      const expected = [
        { foo2: 'bar2', someArray: ['foo', 'bar'], 'some-object': { foo: 'bar' } },
        { headers: { someHeaderOption: 'foo' } },
      ];

      expect(parseRequestData('post', requestData, config)).toEqual(expected);
      expect(parseRequestData('put', requestData, config)).toEqual(expected);
      expect(parseRequestData('patch', requestData, config)).toEqual(expected);
    });

    it('should properly merge options, data, and global parameters for put, patch, and post requests with multiple global params', () => {
      const requestData = {
        options: {},
        params: { foo: 'bar' },
      };

      const config = { globalParameters: { API_KEY: '123456', ANOTHER_KEY: 'SOME_LARGE_KEY' } };

      const expected = [
        { foo: 'bar', API_KEY: '123456', ANOTHER_KEY: 'SOME_LARGE_KEY' },
        {},
      ];

      expect(parseRequestData('post', requestData, config)).toEqual(expected);
      expect(parseRequestData('put', requestData, config)).toEqual(expected);
      expect(parseRequestData('patch', requestData, config)).toEqual(expected);
    });

    it('will merge options and params for get, delete, and head', () => {
      const requestData = {
        options: {},
        params: { foo: 'bar' },
      };

      const expected = [
        { params: { foo: 'bar' } },
      ];

      expect(parseRequestData('get', requestData, {})).toEqual(expected);
    });

    it('will merge options and params for get, delete, and head', () => {
      const requestData = {
        options: { headers: { fooHeader: 'bar' } },
        params: { foo: 'bar' },
      };

      const config = { globalParameters: { someKey: 'KEY' } };

      const expected = [{
        headers: { fooHeader: 'bar' },
        params: { foo: 'bar', someKey: 'KEY' },
      }];

      expect(parseRequestData('get', requestData, config)).toEqual(expected);
    });
  });
});
