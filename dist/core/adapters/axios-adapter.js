"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
class AxiosAdapter {
    constructor(config) {
        this.http = axios_1.default.create(config);
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
exports.default = AxiosAdapter;
