import test from 'ava';
import Auth from './../src/auth';

const user = new Auth({ modelName: 'user', debug: true });
user.debugger.logEnabled = false;

test('login works', (t) => {
    user.login();
    t.is('api/login', user.debugger.data.lastUrl);
});

test('logout works', (t) => {
    user.logout();
    t.is('api/logout', user.debugger.data.lastUrl);
});

test('check works', (t) => {
    user.check();
    t.is('api/auth', user.debugger.data.lastUrl);
});

test('register works', (t) => {
    user.register();
    t.is('api/register', user.debugger.data.lastUrl);
});

const userTwo = new Auth({ modelName: 'User', debug: true, auth: { modelPrefix: true } });
userTwo.debugger.logEnabled = false;

test('modelPrefix works', (t) => {
    userTwo.register();
    t.is('api/user/register', userTwo.debugger.data.lastUrl);
});

const userThree = new Auth({
    modelName: 'User',
    debug: true,
    auth: { modelPrefix: true },
});
// user.debugger.logEnabled = false;

test('modelPrefix works', (t) => {
    userThree.register();
    t.is('api/user/register', userThree.debugger.data.lastUrl);
});

const userFour = new Auth({
    modelName: 'User',
    debug: true,
    auth: {
        routes: {
            login: 'login-user',
            logout: ['logout', 'user'],
            auth: 'authenticate',
            register: 'new',
        },
    },
});
// user.debugger.logEnabled = false;

test('changing routes works', (t) => {
    userFour.login();
    t.is('api/login-user', userFour.debugger.data.lastUrl);

    userFour.logout();
    t.is('api/logout/user', userFour.debugger.data.lastUrl);

    userFour.check();
    t.is('api/authenticate', userFour.debugger.data.lastUrl);

    userFour.register();
    t.is('api/new', userFour.debugger.data.lastUrl);
});

const userFive = new Auth({
    modelName: 'User',
    debug: true,
    auth: {
        methods: {
            login: 'get',
            logout: 'delete',
            auth: 'get',
            register: 'patch',
        },
    },
});
// user.debugger.logEnabled = false;

test('changing methods works', (t) => {
    userFive.login();
    t.is('get', userFive.debugger.data.lastRequest.type);

    userFive.logout();
    t.is('delete', userFive.debugger.data.lastRequest.type);

    userFive.check();
    t.is('get', userFive.debugger.data.lastRequest.type);

    userFive.register();
    t.is('patch', userFive.debugger.data.lastRequest.type);
});
