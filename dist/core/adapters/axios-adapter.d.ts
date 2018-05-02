import { AxiosPromise, AxiosRequestConfig } from 'axios';
import HttpAdapter from '../contracts/http-adapter';
export default class AxiosAdapter implements HttpAdapter {
    private http;
    constructor(config: AxiosRequestConfig);
    get(url: string, params: AxiosRequestConfig): AxiosPromise;
    post(url: string, params: AxiosRequestConfig): AxiosPromise;
    put(url: string, params: AxiosRequestConfig): AxiosPromise;
    patch(url: string, params: AxiosRequestConfig): AxiosPromise;
    head(url: string, params: AxiosRequestConfig): AxiosPromise;
    delete(url: string, params: AxiosRequestConfig): AxiosPromise;
}
