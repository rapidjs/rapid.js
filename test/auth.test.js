import { createAuthModel } from './helpers';

const user = createAuthModel({ modelName: 'user' });

describe('Rapid Auth Model', () => {

    it('should generate the login url', () => {
        user.login();
        expect(user.debugger.data.lastUrl).toBe('api/login');
    });

    it('should generate the logout url', () => {
        user.logout();
        expect(user.debugger.data.lastUrl).toBe('api/logout');
    });

    it('should generate a route to auth check', () => {
        user.check();
        expect(user.debugger.data.lastUrl).toBe('api/auth');
    });

    it('should generate a route to auth register', () => {
        user.register();
        expect(user.debugger.data.lastUrl).toBe('api/register');
    });

    const userTwo = createAuthModel({ modelName: 'User', auth: { modelPrefix: true } });

    it('should contain a model prefix when set in config', () => {
        userTwo.register();
        expect(userTwo.debugger.data.lastUrl).toBe('api/user/register');
    });

    const userFour = createAuthModel({
        modelName: 'User',
        auth: {
            routes: {
                login: 'login-user',
                logout: ['logout', 'user'],
                auth: 'authenticate',
                register: 'new',
            },
        },
    });

    it('should allow overriding in the auth routes', () => {
        userFour.login();
        expect(userFour.debugger.data.lastUrl).toBe('api/login-user');

        userFour.logout();
        expect(userFour.debugger.data.lastUrl).toBe('api/logout/user');

        userFour.check();
        expect(userFour.debugger.data.lastUrl).toBe('api/authenticate');

        userFour.register();
        expect(userFour.debugger.data.lastUrl).toBe('api/new');
    });

    const userFive = createAuthModel({
        modelName: 'User',
        auth: {
            methods: {
                login: 'get',
                logout: 'delete',
                auth: 'get',
                register: 'patch',
            },
        },
    });

    it('should allow overriding the method types', () => {
        userFive.login();
        expect(userFive.debugger.data.lastRequest.type).toBe('get');

        userFive.logout();
        expect(userFive.debugger.data.lastRequest.type).toBe('delete');

        userFive.check();
        expect(userFive.debugger.data.lastRequest.type).toBe('get');

        userFive.register();
        expect(userFive.debugger.data.lastRequest.type).toBe('patch');
    });

});
