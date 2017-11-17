// export default const routes = [
//     {
//         name: 'get_user_forget_name',
//         type: 'get',
//         url: '/user/forget/name',
//         beforeRequest() { },
//         afterRequest() { },
//     },

//     {
//         name: 'user_save_friends',
//         type: 'post',
//         url: '/user/{id}/save/friends',
//         beforeRequest() { },
//         afterRequest() { },
//     }
// ];

// rapid.route('get_user_forget_name').then();
// rapid.route('user_save_friends', { id: 1 }).then();

import { createModel } from './helpers';

const routes = [
    {
        name: 'get_user_forget_name',
        type: 'get',
        url: '/user/forget/name',
    },

    {
        name: 'user_save_friends',
        type: 'post',
        url: '/user/{id}/save/friends',
    },

    {
        name: 'multiple_values',
        type: 'get',
        url: '/user/{id}/{username}',
    },

    {
        name: 'multiple_same_values',
        type: 'get',
        url: '/user/{id}/{username}/save/{id}',
    },
];


describe('Custom Routes should work as designed', () => {
    it('should create an empty object if no routes are defined', () => {
        const model = createModel({ name: 'Drew' });

        expect(model.customRoutes).toEqual({});
    });

    it('should load the custom routes into the config', () => {
        const model = createModel({ customRoutes: routes });

        expect(Object.prototype.hasOwnProperty.call(model.customRoutes, 'get_user_forget_name')).toBeTruthy();
        expect(Object.prototype.hasOwnProperty.call(model.customRoutes, 'user_save_friends')).toBeTruthy();
    });

    const model = createModel({ customRoutes: routes });

    it('should find a route when route() is called', () => {

        expect(model.getCustomRoute('get_user_forget_name').url).toBe('/user/forget/name');
    });

    it('should find urlParams if they exist', () => {

        expect(model.getCustomRoute('get_user_forget_name').urlParams).toEqual([]);
        expect(model.getCustomRoute('user_save_friends').urlParams).toEqual(['id']);
        expect(model.getCustomRoute('multiple_values').urlParams).toEqual(['id', 'username']);
        expect(model.getCustomRoute('multiple_same_values').urlParams).toEqual(['id', 'username', 'id']);
    });

    it('should replace interpolated variables', () => {
        expect(model.getCustomRoute('user_save_friends', { id: 1 }).url).toBe('/user/1/save/friends');
        expect(model.getCustomRoute('multiple_same_values', { id: 1, username: 'drew' }).url).toBe('/user/1/drew/save/1');
    });
});
