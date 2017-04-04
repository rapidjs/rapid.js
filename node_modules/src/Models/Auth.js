import Rapid from './../Rapid';
import _defaultsDeep from 'lodash.defaultsdeep';

var authConfig = {
    auth: {
        routes: {
            login  : 'login',
            logout : 'logout',
            auth   : 'auth'
        },

        methods: {
            login  : 'post',
            logout : 'post',
            auth   : 'get'
        },

        authPrefix: false
    }
};

class Auth extends Rapid {

    constructor (config) {
        config = _defaultsDeep(config, authConfig);
        config.modelName = config.modelName ? config.modelName : 'auth';

        super(config);
    }

    login (credentials) {
        return this[this.authPrefix].withParams(credentials).buildRequest(this.config.auth.methods.login, this.config.auth.routes.login);
    }

    logout () {
        return this[this.authPrefix].buildRequest(this.config.auth.methods.logout, this.config.auth.routes.logout);
    }

    check () {
        return this[this.authPrefix].buildRequest(this.config.auth.methods.auth, this.config.auth.routes.auth);
    }

    get authPrefix () {
        return this.config.auth.authPrefix ? 'model' : 'any';
    }

}

export default Auth;
