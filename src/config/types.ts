export namespace Rapid {
  export interface API {
    all(): Promise<any>;
    find(id: ModelId): Promise<any>;
    findBy(key: ModelId, value: ModelId): Promise<any>;
    get(params): Promise<any>;
    id(id: ModelId): Chainable;
  }

  export type Thunk = (modelName: string) => API;

  /**
   * An alias for methods that are chainable
   */
  export type Chainable = API;

  export interface Context {
    api: API;
    config: Config;
    internals: {
      buildRequest(type: RequestType, url: string): Promise<any>;
      resetRequestData(): void;
      resetURLParams(): void;
    };
    requestData: {
      params: object;
      options: object;
    };
    // url: {
    //   id?: ModelId;
    //   params: ModelId[];
    // },
    urlParams: ModelId[];
  }

  // this config should be the config that is always present at minimum
  export interface Config extends InitializerConfig {
    allowedRequestTypes: RequestType[];
    baseURL: string;
    caseSensitive: boolean;
    http: HttpInstance;
    methods: {
      create: string;
      update: string;
      destroy: string;
      restore: string;
    };
    modelName: string;
    routeDelimeter: string;
    suffixes: {
      create: string;
      update: string;
      destroy: string;
      restore: string;
    };
    trailingSlash: boolean;
  }

  export interface InitializerConfig {
    afterRequest?(response): void;
    allowedRequestTypes?: RequestType[];
    baseURL?: string;
    beforeRequest?(type: RequestType, url: string): void;
    caseSensitive?: boolean;
    extension?: string;
    onError?(error: () => void): void;
    globalParameters?: object;
    http: HttpInstance;
    methods?: {
      create?: string;
      update?: string;
      destroy?: string;
      restore?: string;
    };
    modelName?: string;
    routeDelimeter?: string;
    suffixes?: {
      create?: string;
      update?: string;
      destroy?: string;
      restore?: string;
    };
    trailingSlash?: boolean;
    transformRequestData(data: Context['requestData']): any;
    transformURL?(url: string): string;
  }

  export interface ConfigWithModel extends InitializerConfig {
    modelName: string;
  }

  export type ModelId = string | number;

  export enum RequestType {
    Get = 'get',
    Post = 'post',
    Put = 'put',
    Patch = 'patch',
    Head = 'head',
    Delete = 'delete',
  }

  export interface HttpInstance<T = Promise<any>> {
    get(url: string, params: object): T;
    post(url: string, params: object): T;
    put(url: string, params: object): T;
    patch(url: string, params: object): T;
    head(url: string, params: object): T;
    delete(url: string, params: object): T;
  }

  export const enum Errors {
    NoConfigProvided = 'You must provide a config object.',
    NoHttp = 'You provide an http instance in `config.http`.',
    NoModelName = 'You must provide a modelName.',
  }
}
