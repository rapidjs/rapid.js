import test from 'ava';
import Rapid from './../src/rapid';

var shark = new Rapid({
    modelName: 'shark',
    debug: true
});

shark.debugger.logEnabled = false;

test('works with basic CRUD', t => {

    shark.id(23).find();
    t.is('api/shark/23', shark.debugger.data.lastUrl);

    shark.id(234).save({});
    t.is('api/shark/234/update', shark.debugger.data.lastUrl);

    shark.id(456).destroy();
    t.is('api/shark/456/destroy', shark.debugger.data.lastUrl);

});

test('works with other requests', t => {

    shark.id(23).get();
    t.is('api/shark/23', shark.debugger.data.lastUrl);

    shark.id(789).get('fish', 'are', 'friends', 'not', 'food');
    t.is('api/shark/789/fish/are/friends/not/food', shark.debugger.data.lastUrl);

    shark.id(23).post('swim');
    t.is('api/shark/23/swim', shark.debugger.data.lastUrl);

    shark.id(234).delete('eat', 'fish');
    t.is('api/shark/234/eat/fish', shark.debugger.data.lastUrl);

    shark.id(456).patch();
    t.is('api/shark/456', shark.debugger.data.lastUrl);

});
