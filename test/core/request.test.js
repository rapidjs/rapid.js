import { createModel } from './helpers';
import { Mockid } from '../../src/debug/mockid';
import Rapid from '../../src/core';

const mockHttp = new Mockid();
const mockModel = new Rapid({
  modelName: 'mock',
  http: mockHttp,
});

mockHttp.install(mockModel);

describe('Basic Request Methods', () => {
  it('should fire a basic get request', () => {
    mockModel.get('/some-get-request')
      .then(response => {
        expect(response.url).toBe('api/mock/some-get-request');
        expect(response.requestType).toBe('get');
      });
  });

  it('should fire a basic post request', () => {
    mockModel.post('/some-post-request')
      .then(response => {
        expect(response.url).toBe('api/mock/some-post-request');
        expect(response.requestType).toBe('post');
      });
  });

  it('should fire a basic delete request', () => {
    mockModel.delete('/some-delete-request')
      .then(response => {
        expect(response.url).toBe('api/mock/some-delete-request');
        expect(response.requestType).toBe('delete');
      });
  });

  it('should fire a basic head request', () => {
    mockModel.head('/some-head-request')
      .then(response => {
        expect(response.url).toBe('api/mock/some-head-request');
        expect(response.requestType).toBe('head');
      });
  });

  it('should fire a basic patch request', () => {
    mockModel.patch('/some-patch-request')
      .then(response => {
        expect(response.url).toBe('api/mock/some-patch-request');
        expect(response.requestType).toBe('patch');
      });
  });

  it('should fire a basic put request', () => {
    mockModel.put('/some-put-request')
      .then(response => {
        expect(response.url).toBe('api/mock/some-put-request');
        expect(response.requestType).toBe('put');
      });
  });

  it('should fire a basic options request', () => {
    mockModel.options('/some-options-request')
      .then(response => {
        expect(response.url).toBe('api/mock/some-options-request');
        expect(response.requestType).toBe('options');
      });
  });
});

const lobster = createModel({ modelName: 'Lobster', baseURL: 'http://maine.com/ocean/' });

describe('The request functionality should work as expected', () => {
  it('afterRequest gets fired', () => {
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

  it('beforeRequest gets fired', () => {
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
});
