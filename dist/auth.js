"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const defaultsDeep_1 = __importDefault(require("lodash/defaultsDeep"));
const rapid_1 = __importDefault(require("./core/rapid"));
const authConfig = {
    routes: {
        login: 'login',
        logout: 'logout',
        auth: 'auth',
        register: 'register',
    },
    methods: {
        login: 'post',
        logout: 'post',
        auth: 'get',
        register: 'post',
    },
    modelPrefix: false
};
class Auth extends rapid_1.default {
    constructor(config) {
        config = defaultsDeep_1.default(config, { auth: authConfig });
        config.modelName = config.modelName ? config.modelName : 'auth';
        super(config);
    }
    login(credentials = {}) {
        return this[this.modelPrefix].withParams(credentials)
            .withOption('auth', credentials)
            .buildRequest(this.config.auth.methods.login, this.config.auth.routes.login);
    }
    logout() {
        return this[this.modelPrefix]
            .buildRequest(this.config.auth.methods.logout, this.config.auth.routes.logout);
    }
    check() {
        return this[this.modelPrefix]
            .buildRequest(this.config.auth.methods.auth, this.config.auth.routes.auth);
    }
    register(credentials = {}) {
        return this[this.modelPrefix].withParams(credentials)
            .buildRequest(this.config.auth.methods.register, this.config.auth.routes.register);
    }
    get modelPrefix() {
        return this.config.auth.modelPrefix ? 'model' : 'any';
    }
}
exports.default = Auth;
