export default interface HttpAdapter {
    get(url: string, params: object): any;
    post(url: string, params: object): any;
    put(url: string, params: object): any;
    patch(url: string, params: object): any;
    head(url: string, params: object): any;
    delete(url: string, params: object): any;
}
