import { RequestType } from '../core/request';
export default class  {
    private caller;
    private data;
    private logEnabled;
    constructor(caller: any);
    fakeRequest(type: RequestType, url: string): string;
    setLastUrl(type: any, url: any, params?: {
        params: {};
    }): string;
    setLastRequest(type: RequestType, url: string, data?: {}, options?: {}): void;
}
