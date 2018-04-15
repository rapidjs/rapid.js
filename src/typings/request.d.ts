export declare enum RequestType {
  GET = 'get',
  POST = 'post',
  PUT = 'put',
  PATCH = 'patch',
  HEAD = 'head',
  DELETE = 'delete',
}

export declare interface RequestData {
  params: object;
  options: {
    // TODO: this seems fishy...
    params?: object
  };
}
