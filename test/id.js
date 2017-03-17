import test from 'ava';
import Rapid from './../resources/assets/js/Interface/Rapid/Rapid';

var Shark = new Rapid({
    modelName: 'shark',
    debug: true
});

test('works with basic CRUD', t => {

    Shark.id(23).find();
    t.is('api/shark/23', Shark.debugger.data.lastUrl);

    Shark.id(234).save({});
    t.is('api/shark/234/update', Shark.debugger.data.lastUrl);

    Shark.id(456).destroy();
    t.is('api/shark/456/destroy', Shark.debugger.data.lastUrl);

});

test('works with other requests', t => {

    Shark.id(23).get();
    t.is('api/shark/23', Shark.debugger.data.lastUrl);

    Shark.id(789).get('fish', 'are', 'friends', 'not', 'food');
    t.is('api/shark/789/fish/are/friends/not/food', Shark.debugger.data.lastUrl);

    Shark.id(23).post('swim');
    t.is('api/shark/23/swim', Shark.debugger.data.lastUrl);

    Shark.id(234).delete('eat', 'fish');
    t.is('api/shark/234/eat/fish', Shark.debugger.data.lastUrl);

    Shark.id(456).patch();
    t.is('api/shark/456', Shark.debugger.data.lastUrl);

});
