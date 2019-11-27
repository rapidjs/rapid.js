import { createRapid } from './create-rapid';
import { Rapid } from './config/types';

function createMockHttp(): Rapid.HttpInstance {
  return {
    get,
    post,
    put,
    patch,
    head,
    delete: deleteMethod,
  };

  function mockPromise({ type, url, params }: { url: string; params: object; type: Rapid.RequestType }): Promise<any> {
    return Promise.resolve({
      url,
      type,
      params,
    });
  }

  function get(url: string, params: object): Promise<any> {
    return mockPromise({ type: Rapid.RequestType.Get, url, params });
  }

  function post(url: string, params: object): Promise<any> {
    return mockPromise({ type: Rapid.RequestType.Post, url, params });
  }

  function put(url: string, params: object): Promise<any> {
    return mockPromise({ type: Rapid.RequestType.Put, url, params });
  }

  function patch(url: string, params: object): Promise<any> {
    return mockPromise({ type: Rapid.RequestType.Patch, url, params });
  }

  function head(url: string, params: object): Promise<any> {
    return mockPromise({ type: Rapid.RequestType.Head, url, params });
  }

  function deleteMethod(url: string, params: object): Promise<any> {
    return mockPromise({ type: Rapid.RequestType.Delete, url, params });
  }
}

describe('createRapid', () => {
  it('should create a rapid instance', () => {
    // @ts-ignore
    const rapid = createRapid({
      modelName: 'user',
      http: createMockHttp(),
    });

    expect(rapid).not.toBeUndefined();
  });

  it('should throw an error when there is no modelName', () => {
    expect(() => {
      // @ts-ignore
      const rapid = createRapid({
        http: createMockHttp(),
      });
    }).toThrow();
  });

  it('should throw an error when there is no http', () => {
    expect(() => {
      // @ts-ignore
      const rapid = createRapid({
        modelName: 'user',
      });
    }).toThrow();
  });

  describe('all()', () => {
    const rapid = createRapid({
      modelName: 'user',
      http: createMockHttp(),
    });

    it('should make a GET request', async () => {
      const request = await rapid.all();

      expect(request.type).toEqual(Rapid.RequestType.Get);
    });
  });
});
