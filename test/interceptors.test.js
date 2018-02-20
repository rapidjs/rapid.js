import { createModel } from './helpers';

const getModel = createModel({
  modelName: 'get'
});

const interceptors = {
  response: [() => 'request']
};

describe('Interceptors', () => {
  it('should create empty interceptors from `Defaults`', () => {
    const model = createModel({});

    expect(model.interceptors.request).toEqual([]);
    expect(model.interceptors.response).toEqual([]);
  });

  it('should load the defined interceptors', () => {
    const model = createModel({ interceptors });

    expect(model.interceptors).toEqual(interceptors);
  });
})
