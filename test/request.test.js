import { createModel } from './helpers';

const lobster = createModel({ modelName: 'Lobster', baseURL: 'http://maine.com/ocean/' });

describe('The request functionality should work as expected', () => {
  it('get() works', () => {
    lobster.get('butter');

    expect((lobster.debugger.data.lastRequest.type === 'get')).toBeTruthy();

    expect(lobster.debugger.data.lastUrl).toBe('http://maine.com/ocean/lobster/butter');

    lobster.collection.get('butter', 'salt');
    expect(lobster.debugger.data.lastUrl).toBe('http://maine.com/ocean/lobsters/butter/salt');

    lobster.get('butter', 'salt', 'crackers');
    expect(lobster.debugger.data.lastUrl).toBe('http://maine.com/ocean/lobster/butter/salt/crackers');
  });

  it('post() works', () => {
    lobster.post('butter');

    expect((lobster.debugger.data.lastRequest.type === 'post')).toBeTruthy();

    expect(lobster.debugger.data.lastUrl).toBe('http://maine.com/ocean/lobster/butter');

    lobster.collection.post('butter', 'salt');
    expect(lobster.debugger.data.lastUrl).toBe('http://maine.com/ocean/lobsters/butter/salt');

    lobster.post('butter', 'salt', 'crackers');
    expect(lobster.debugger.data.lastUrl).toBe('http://maine.com/ocean/lobster/butter/salt/crackers');
  });

  it('head() works', () => {
    lobster.head('butter');

    expect((lobster.debugger.data.lastRequest.type === 'head')).toBeTruthy();

    expect(lobster.debugger.data.lastUrl).toBe('http://maine.com/ocean/lobster/butter');

    lobster.collection.head('butter', 'salt');
    expect(lobster.debugger.data.lastUrl).toBe('http://maine.com/ocean/lobsters/butter/salt');

    lobster.head('butter', 'salt', 'crackers');
    expect(lobster.debugger.data.lastUrl).toBe('http://maine.com/ocean/lobster/butter/salt/crackers');
  });

  it('put() works', () => {
    lobster.put('butter');

    expect((lobster.debugger.data.lastRequest.type === 'put')).toBeTruthy();

    expect(lobster.debugger.data.lastUrl).toBe('http://maine.com/ocean/lobster/butter');

    lobster.collection.put('butter', 'salt');
    expect(lobster.debugger.data.lastUrl).toBe('http://maine.com/ocean/lobsters/butter/salt');

    lobster.put('butter', 'salt', 'crackers');
    expect(lobster.debugger.data.lastUrl).toBe('http://maine.com/ocean/lobster/butter/salt/crackers');
  });

  it('patch() works', () => {
    lobster.patch('butter');

    expect((lobster.debugger.data.lastRequest.type === 'patch')).toBeTruthy();

    expect(lobster.debugger.data.lastUrl).toBe('http://maine.com/ocean/lobster/butter');

    lobster.collection.patch('butter', 'salt');
    expect(lobster.debugger.data.lastUrl).toBe('http://maine.com/ocean/lobsters/butter/salt');

    lobster.patch('butter', 'salt', 'crackers');
    expect(lobster.debugger.data.lastUrl).toBe('http://maine.com/ocean/lobster/butter/salt/crackers');
  });

  it('delete() works', () => {
    lobster.delete('butter');

    expect((lobster.debugger.data.lastRequest.type === 'delete')).toBeTruthy();

    expect(lobster.debugger.data.lastUrl).toBe('http://maine.com/ocean/lobster/butter');

    lobster.collection.delete('butter', 'salt');
    expect(lobster.debugger.data.lastUrl).toBe('http://maine.com/ocean/lobsters/butter/salt');

    lobster.delete('butter', 'salt', 'crackers');
    expect(lobster.debugger.data.lastUrl).toBe('http://maine.com/ocean/lobster/butter/salt/crackers');
  });

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
