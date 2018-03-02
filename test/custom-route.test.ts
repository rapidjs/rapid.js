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
    type: 'post',
    url: '/user/{id}/{username}',
  },

  {
    name: 'multiple_same_values',
    type: 'delete',
    url: '/user/{id}/{username}/save/{id}',
  },
];


describe('Custom Routes should work as designed', () => {
  it('should create an empty object if no routes are defined', () => {
    const model = createModel({ name: 'Drew' });

    expect(model.customRoutes).toEqual([]);
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
    expect(model.generate('user_save_friends3')).toBe('');
    expect(model.generate('user_save_friends', { id: 1 })).toBe('/api/user/1/save/friends');
    expect(model.generate('multiple_same_values', { id: 1, username: 'drew' })).toBe('/api/user/1/drew/save/1');
  });

  it('should fire the proper request type and url', () => {
    model.route('get_user_forget_name');

    expect(model.debugger.data.lastUrl).toBe('api/user/forget/name');
    expect(model.debugger.data.lastRequest.type).toBe('get');

    model.route('user_save_friends', { id: 123 });
    expect(model.debugger.data.lastUrl).toBe('api/user/123/save/friends');
    expect(model.debugger.data.lastRequest.type).toBe('post');

    model.route('multiple_values', { id: 563, username: 'drewjbartlett' });
    expect(model.debugger.data.lastUrl).toBe('api/user/563/drewjbartlett');
    expect(model.debugger.data.lastRequest.type).toBe('post');

    model.route('multiple_same_values', { id: 563, username: 'drewjbartlett' });
    expect(model.debugger.data.lastUrl).toBe('api/user/563/drewjbartlett/save/563');
    expect(model.debugger.data.lastRequest.type).toBe('delete');
  });

  const newModel = createModel({ baseURL: '/water', customRoutes: routes });

  it('should append the baseURL in the custom route', () => {
    expect(newModel.generate('get_user_forget_name')).toBe('/water/user/forget/name');
  });

  const anotherModel = createModel({ baseURL: '', customRoutes: routes });

  it('should append the baseURL in the custom route', () => {
    expect(anotherModel.generate('get_user_forget_name')).toBe('/user/forget/name');
  });
});
