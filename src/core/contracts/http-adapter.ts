export default interface HttpAdapter {
  get(url: string, params: object);
  post(url: string, params: object);
  put(url: string, params: object);
  patch(url: string, params: object);
  head(url: string, params: object);
  delete(url: string, params: object);
}
