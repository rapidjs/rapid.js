import { AxiosInstance, AxiosPromise, AxiosRequestConfig } from 'axios';
import axios from 'axios';

export default class AxiosAdapter implements HttpAdapterInterface {
  private http: AxiosInstance;

  constructor(config: object) {
    this.http = axios.create(config);
  }

  public get(url: string, params: AxiosRequestConfig): AxiosPromise {
    return this.http.get(url, params);
  }

  public post(url: string, params: AxiosRequestConfig): AxiosPromise {
    return this.http.post(url, params);
  }

  public put(url: string, params: AxiosRequestConfig): AxiosPromise {
    return this.http.put(url, params);
  }

  public patch(url: string, params: AxiosRequestConfig): AxiosPromise {
    return this.http.patch(url, params);
  }

  public head(url: string, params: AxiosRequestConfig): AxiosPromise {
    return this.http.head(url, params);
  }

  public delete(url: string, params: AxiosRequestConfig): AxiosPromise {
    return this.http.delete(url, params);
  }
}
