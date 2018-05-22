import AxiosAdapter from './adapters/axios-adapter';
declare const _default: {
    allowedRequestTypes: string[];
    apiConfig: {};
    baseURL: string;
    caseSensitive: boolean;
    customRoutes: any[];
    debug: boolean;
    defaultRoute: string;
    extension: string;
    globalParameters: {};
    http: typeof AxiosAdapter;
    methods: {
        create: string;
        update: string;
        destroy: string;
        restore: string;
    };
    modelName: string;
    primaryKey: string;
    routeDelimeter: string;
    routes: {
        model: string;
        collection: string;
        any: string;
    };
    suffixes: {
        create: string;
        update: string;
        destroy: string;
        restore: string;
    };
    trailingSlash: boolean;
    beforeRequest(type: any, url: any): void;
    afterRequest(response: any): void;
    onError(response: any): void;
};
export default _default;
