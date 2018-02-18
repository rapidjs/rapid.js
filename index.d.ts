import { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

declare enum RequestType {
    GET = 'get',
    POST = 'post',
    PUT = 'put',
    PATCH = 'patch',
    HEAD = 'head',
    DELETE = 'delete',
}

declare enum Method {
    CREATE = 'create',
    UPDATE = 'update',
    DESTROY = 'delete',
}

declare interface Config {
    afterRequest?: (response: AxiosResponse) => any;
    allowedRequestTypes?: RequestType[];
    apiConfig?: AxiosRequestConfig;
    baseURL?: string;
    beforeRequest?: (type: RequestType, url: string) => any;
    caseSensitive?: boolean;
    debug?: boolean;
    defaultRoute?: string;
    extension?: string;
    globalParameters?: object;
    methods?: { [method in Method]: RequestType };
    modelName?: string;
    onError?: (error: Error) => any;
    primaryKey?: string;
    routeDelimeter?: string;
    routes?: {
        model?: string;
        collection?: string;
    };
    suffixes?: { [method in Method]: string };
    trailingSlash?: boolean;
}

declare class CustomRoute {
    route: object;
    config: object;
    urlParams: string[];
    url: string;
    rawURL: string;
    name: string;
    type: string;
    constructor(route?: object, config?: object);
    replaceURLParams(): string;
}

declare class Debugger {
    caller: any;
    data: object;
    logEnabled: boolean;
    constructor(caller: any);
    fakeRequest(type: RequestType, url: string): string;
    setLastUrl(type: RequestType, url: string, params: object): string;
    setLastRequest(
        type: RequestType,
        url: string,
        data: object,
        params: object
    ): string;
}

declare class Logger {
    prefix: string;
    firedDebugNotice: boolean;
    constructor(prefix: string);
    fireDebugNotice(): void;
    debug(message: string): void;
    log(message: string): void;
    warn(message: string): void;
}

declare class Core {
    api: AxiosInstance;
    config: Config;
    customRoutes: object;
    debugger: Debugger | false;
    logger: Logger | false;
    requestData: { params: object; options: object };
    debug: boolean;
    collection: this;
    model: this;
    any: this;
    baseURL: string;
    modelName: string;
    routeDelimiter: string;
    caseSensitive: boolean;
    constructor(config?: Config);
    boot(): void;
    initialize(config: Config): void;
    fireSetters(): void;
    initializeDebugger(): void;
    initializeLogger(): void;
    initializeAPI(): void;
    initializeRoutes(): void;
    defineCustomRoutes(): void;
    resetRequestData(): void;
}

declare class Url extends Core {
    urlParams: boolean;
    makeUrl(...params: string[]): string;
    sanitizeUrl(url: string): string;
    resetURLParams(): void;
    setParams(urlParams: string[], prepend: boolean, overwrite: boolean): this;
    url(...params: string[]): this;
    prepend(params: string[]): this;
    append(params: string[]): this;
}

declare class Routes extends Url {
    currentRoute: string;
    setCurrentRoute(route: string): void;
    setRoute(route: string): void;
    setRoutes(): void;
}

declare class Request extends Routes {
    parseRequestData(type: RequestType): any[];
    request(type: RequestType, url: string): Promise<AxiosResponse>;
    isAllowedRequestType(type: RequestType): boolean;
    buildRequest(
        type: RequestType,
        urlParams: string[]
    ): Promise<AxiosResponse>;
    get(...urlParams: string[]): Promise<AxiosResponse>;
    post(...urlParams: string[]): Promise<AxiosResponse>;
    put(...urlParams: string[]): Promise<AxiosResponse>;
    patch(...urlParams: string[]): Promise<AxiosResponse>;
    head(...urlParams: string[]): Promise<AxiosResponse>;
    delete(...urlParams: string[]): Promise<AxiosResponse>;
    route(
        name: string,
        routeParams: object,
        requestParams: object
    ): Promise<AxiosResponse>;
    getCustomRoute(name: string, routeParams: object): CustomRoute;
    generate(name: string, routeParams: object): string;
    beforeRequest(type: RequestType, url: string): any;
    afterRequest(response: AxiosResponse): void;
    onError(error: Error): void;
    withData(data: object): this;
    withParams(params: object): this;
    withParam(key: string, value: any): this;
    withOptions(options: object): this;
    withOption(key: string, value: any): this;
}

declare class Crud extends Request {
    find(id: any): Promise<AxiosResponse>;
    updateOrDestroy(
        method: RequestType,
        ...params: string[]
    ): Promise<AxiosResponse>;
    update(...params: string[]): Promise<AxiosResponse>;
    save(...params: string[]): Promise<AxiosResponse>;
    destroy(...params: string[]): Promise<AxiosResponse>;
    create(data: object): Promise<AxiosResponse>;
    id(id: any): this;
    destroy(...params: string[]): Promise<AxiosResponse>;
    all(): Promise<AxiosResponse>;
    findBy(key: string, value: any): Promise<AxiosResponse>;
}

export declare class Rapid extends Crud {
    constructor(config?: Config);
}

export declare class Auth extends Rapid {
    modelPrefix: string;
    login(credentials: object): Promise<AxiosResponse>;
    logout(): Promise<AxiosResponse>;
    check(): Promise<AxiosResponse>;
    register(credentials: object): Promise<AxiosResponse>;
}

export default Rapid;
