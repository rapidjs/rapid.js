export namespace Config {
  export interface Model {
    allowedRequestTypes: RequestTypes[];
    baseURL: string;
    caseSensitive: boolean;
    defaultRoute: RouteTypes;
    extension?: string;
    globalParameters?: object;
    http: any; // HttpInterface
    methods: {
      create: RequestTypes;
      destroy: RequestTypes;
      update: RequestTypes;
      restore: RequestTypes;
    };
    modelName: string;
    primaryKey: string;
  }

  export enum RequestTypes {
    Delete = 'delete',
    Get = 'get',
    Head = 'head',
    Patch = 'patch',
    Post = 'post',
    Put = 'put',
    Options = 'options'
  }

  export enum RouteTypes {
    Any = 'any',
    Collection = 'collection',
    Model = 'model'
  }
}
