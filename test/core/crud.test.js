import { createModel } from './helpers';

const userModel = createModel({
  modelName: 'user',
});

describe('The basic CRUD methods should work', () => {
  it('that it will have the right url for find', () => {
    userModel.find(1);

    expect(userModel.debugger.data.lastUrl).toBe('api/user/1');
  });

  it('that it will have the right url for all', () => {
    userModel.all();

    expect(userModel.debugger.data.lastUrl).toBe('api/users');
  });

  const myModel = createModel({
    modelName: 'model',
  });

  it('that it will have the right url for findBy', () => {
    myModel.findBy('key', 'value');

    expect(myModel.debugger.data.lastUrl).toBe('api/model/key/value');

    myModel.collection.findBy('key', 'value');

    expect(myModel.debugger.data.lastUrl).toBe('api/models/key/value');
  });

  const testModel = createModel({
    modelName: 'testModel',
    suffixes: {
      create: 'new',
      update: 'save',
      destroy: 'delete',
    },
  });

  it('that create will have the correct url', () => {
    testModel.create({});
    expect(testModel.debugger.data.lastUrl).toBe('api/test-model/new');
  });

  it('that update will work', () => {
    testModel.update({});
    expect(testModel.debugger.data.lastUrl).toBe('api/test-model/save');

    testModel.update(12345, {});
    expect(testModel.debugger.data.lastUrl).toBe('api/test-model/12345/save');
  });

  it('that destroy will work', () => {
    testModel.destroy({});
    expect(testModel.debugger.data.lastUrl).toBe('api/test-model/delete');

    testModel.destroy(12345, {});
    expect(testModel.debugger.data.lastUrl).toBe('api/test-model/12345/delete');
  });

  it('that restore should work', () => {
    testModel.restore(12345);
    expect(testModel.debugger.data.lastUrl).toBe('api/test-model/12345/restore');

    testModel.restore('');
    expect(testModel.debugger.data.lastUrl).toBe('api/test-model/restore');
    expect((testModel.debugger.data.lastRequest.type === 'post')).toBeTruthy();
  });

  const anotherTestModel = createModel({
    modelName: 'testModel',
    methods: {
      restore: 'get',
    },
    suffixes: {
      restore: 'undelete',
    },
  });

  it('that restore suffix and request type should work', () => {
    anotherTestModel.restore(12345);
    expect(anotherTestModel.debugger.data.lastUrl).toBe('api/test-model/12345/undelete');

    anotherTestModel.restore('');
    expect(anotherTestModel.debugger.data.lastUrl).toBe('api/test-model/undelete');

    expect((anotherTestModel.debugger.data.lastRequest.type === 'get')).toBeTruthy();
  });
});
