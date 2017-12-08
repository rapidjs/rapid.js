import { createModel } from './helpers';


const shark = createModel({
  modelName: 'shark',
});

describe('The id() method works as it should', () => {
  it('works with basic CRUD', () => {
    shark.id(23).find();
    expect(shark.debugger.data.lastUrl).toBe('api/shark/23');

    shark.id(234).save({});
    expect(shark.debugger.data.lastUrl).toBe('api/shark/234/update');

    shark.id(456).destroy();
    expect(shark.debugger.data.lastUrl).toBe('api/shark/456/destroy');
  });

  it('works with other requests', () => {
    shark.id(23).get();
    expect(shark.debugger.data.lastUrl).toBe('api/shark/23');

    shark.id(789).get('fish', 'are', 'friends', 'not', 'food');
    expect(shark.debugger.data.lastUrl).toBe('api/shark/789/fish/are/friends/not/food');

    shark.id(23).post('swim');
    expect(shark.debugger.data.lastUrl).toBe('api/shark/23/swim');

    shark.id(234).delete('eat', 'fish');
    expect(shark.debugger.data.lastUrl).toBe('api/shark/234/eat/fish');

    shark.id(456).patch();
    expect(shark.debugger.data.lastUrl).toBe('api/shark/456');
  });
});
