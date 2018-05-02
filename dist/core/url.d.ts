import Core from './core';
declare class Url extends Core {
    constructor(config: any);
    protected makeUrl(...params: any[]): string;
    protected sanitizeUrl(url: string): string;
    setURLParams(urlParams?: any[], prepend?: boolean, overwrite?: boolean): this;
    url(...params: any[]): this;
    prepend(params: any): this;
    append(params: any): this;
}
export default Url;
