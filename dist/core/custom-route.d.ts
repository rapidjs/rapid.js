import { RequestType } from './request';
interface CustomRouteOptions {
    url: string;
    type: RequestType;
    name: string;
}
declare class CustomRoute {
    private route;
    private config;
    constructor(route?: {}, config?: {});
    replaceURLParams(): string;
    readonly urlParams: string[];
    readonly url: string;
    readonly rawURL: string;
    readonly name: string;
    readonly type: RequestType;
}
export { CustomRouteOptions };
export default CustomRoute;
