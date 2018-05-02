import axios from 'axios';
export default class AxiosAdapter {
    constructor(config) {
        this.http = axios.create(config);
    }
    get(url, params) {
        return this.http.get(url, params);
    }
    post(url, params) {
        return this.http.post(url, params);
    }
    put(url, params) {
        return this.http.put(url, params);
    }
    patch(url, params) {
        return this.http.patch(url, params);
    }
    head(url, params) {
        return this.http.head(url, params);
    }
    delete(url, params) {
        return this.http.delete(url, params);
    }
}
