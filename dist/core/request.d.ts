import Url from './url';
import CustomRoute from './custom-route';
interface RequestData {
    params: object;
    options: {
        params?: object;
    };
}
declare enum RequestType {
    GET = "get",
    POST = "post",
    PUT = "put",
    PATCH = "patch",
    HEAD = "head",
    DELETE = "delete",
}
declare class Request extends Url {
    constructor(config: any);
    parseRequestData(type: any): any[];
    request(type: RequestType, url: any): string | Promise<{}>;
    isAllowedRequestType(type: any): boolean;
    buildRequest(type: any, urlParams: any): string | Promise<{}>;
    get(...urlParams: any[]): string | Promise<{}>;
    post(...urlParams: any[]): string | Promise<{}>;
    put(...urlParams: any[]): string | Promise<{}>;
    patch(...urlParams: any[]): string | Promise<{}>;
    head(...urlParams: any[]): string | Promise<{}>;
    delete(...urlParams: any[]): string | Promise<{}>;
    route(name?: string, routeParams?: {}, requestParams?: {}): string | Promise<{}>;
    getCustomRoute(name?: string, routeParams?: {}): CustomRoute;
    generate(name?: string, routeParams?: {}): string;
    beforeRequest(type: RequestType, url: string): any;
    afterRequest(response: any): void;
    onError(error: any): void;
    withData(data?: {}): this;
    withParams(params?: {}): this;
    withParam(key: any, value: any): this;
    withOptions(options?: {}): this;
    withOption(key: any, value: any): this;
}
export { RequestData, RequestType };
export default Request;
