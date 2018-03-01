import { AxiosInstance, AxiosPromise } from 'axios';
import axios from 'axios';

export default class AxiosAdapter implements HttpAdapterInterface {
  private http: AxiosInstance;

  constructor(config: Config['httpConfig']) {
    this.http = axios.create(config);
  }

  public get(url, params): AxiosPromise {
    return this.http.get(url, params);
  }

  public post(url, params): AxiosPromise {
    return this.http.post(url, params);
  }

  public put(url, params): AxiosPromise {
    return this.http.put(url, params);
  }

  public patch(url, params): AxiosPromise {
    return this.http.patch(url, params);
  }

  public head(url, params): AxiosPromise {
    return this.http.head(url, params);
  }

  public delete(url, params): AxiosPromise {
    return this.http.delete(url, params);
  }
}