import { createRapid } from './create-rapid';
import { Rapid } from './config/types';

interface MockHttp extends Rapid.HttpInstance {
  shouldReject: boolean;
}

function createMockHttp(): MockHttp {
  const api = {
    get,
    post,
    put,
    patch,
    head,
    delete: deleteMethod,
    shouldReject: false,
  };

  return api;

  function mockPromise({ type, url, params }: { url: string; params: object; type: Rapid.RequestType }): Promise<any> {
    const promiseMethod = api.shouldReject ? 'reject' : 'resolve';

    // @ts-ignore
    return Promise[promiseMethod]({
      url,
      type,
      requestData: params,
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

describe('Constructor', () => {
  it('should create a rapid instance with an API when modelName is passed', () => {
    // @ts-ignore
    const rapid = createRapid({
      modelName: 'user',
      http: createMockHttp(),
    });

    expect(rapid.all).not.toBeUndefined();
  });

  it('should create a thunk when modelName is omitted', () => {
    // @ts-ignore
    const rapid = createRapid({
      http: createMockHttp(),
    });

    // @ts-ignore
    expect(rapid.all).toBeUndefined();
    expect(typeof rapid).toBe('function');
  });

  it('should throw an error when there is no modelName', () => {
    const rapid = createRapid({
      http: createMockHttp(),
    });

    expect(() => {
      // @ts-ignore
      rapid().all();
    }).toThrow(Rapid.Errors.NoModelName);
  });

  it('should throw an error when there is no config', () => {
    expect(() => {
      // @ts-ignore
      createRapid();
    }).toThrow(Rapid.Errors.NoConfigProvided);
  });

  it('should throw an error when there is no http', () => {
    expect(() => {
      // @ts-ignore
      createRapid({});
    }).toThrow(Rapid.Errors.NoHttp);
  });
});

describe('API', () => {
  // thunking
  describe('all() - thunk', () => {
    const rapid = createRapid({
      http: createMockHttp(),
    });

    it('should make a GET request', async () => {
      const request = await rapid('users').all();

      expect(request.type).toBe(Rapid.RequestType.Get);
      expect(request.url).toBe('users');
    });
  });

  describe('all() - API', () => {
    const rapid = createRapid({
      modelName: 'users',
      http: createMockHttp(),
    });

    it('should make a GET request', async () => {
      const request = await rapid.all();

      expect(request.type).toEqual(Rapid.RequestType.Get);
      expect(request.url).toBe('users');
    });
  });

  describe('find()', () => {
    it('should make a GET request with the id in the url', async () => {
      const rapid = createRapid({
        http: createMockHttp(),
      });

      const request = await rapid('users').find(1);

      expect(request.type).toBe(Rapid.RequestType.Get);
      expect(request.url).toBe('users/1');
    });
  });

  describe('findBy()', () => {
    it('should make a GET request with key/value in the URL', async () => {
      const rapid = createRapid({
        http: createMockHttp(),
      });
      const request = await rapid('users').findBy('key', 'value');

      expect(request.type).toBe(Rapid.RequestType.Get);
      expect(request.url).toBe('users/key/value');
    });
  });

  describe('id()', () => {
    it('it should return a chainable API', async () => {
      const rapid = createRapid({
        http: createMockHttp(),
      });

      const request = rapid('users').id(1234);

      expect(request.get).not.toBeUndefined();

      request.get({}); // flush the id for the next test
    });

    it('it should set the URL params with an id', async () => {
      const rapid = createRapid({
        http: createMockHttp(),
      });

      const request = await rapid('users')
        .id(1234)
        .get({});

      expect(request.type).toBe(Rapid.RequestType.Get);
      expect(request.url).toBe('users/1234');
    });
  });

  describe('withParams()', () => {
    it('should add params to the request', async () => {
      const params = { foo: 'bar', user: { id: 1 } };
      const rapid = createRapid({
        http: createMockHttp(),
      });
      const request = await rapid('users')
        .withParams(params)
        .get({});

      expect(request.type).toBe(Rapid.RequestType.Get);
      expect(request.requestData.params).toEqual(params);
    });

    it('should flush params after request?', () => {
      expect(true).toBe(true);
    });
  });
});

describe('Hooks: beforeRequest, afterRequest, onError', () => {});
