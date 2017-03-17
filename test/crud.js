import test from 'ava';
import Rapid from './../resources/assets/js/Interface/Rapid/Rapid';

var userModel = new Rapid({
    modelName: 'user',
    debug: true
});

userModel.debugger.logEnabled = false;

test('that it will have the right url for find', t => {

    userModel.find(1);

    t.is('api/user/1', userModel.debugger.data.lastUrl);

});

test('that it will have the right url for all', t => {

    userModel.all();

    t.is('api/users', userModel.debugger.data.lastUrl);

});

var myModel = new Rapid({
    modelName: 'model',
    debug: true
});

myModel.debugger.logEnabled = false;

test('that it will have the right url for findBy', t => {

    myModel.findBy('key', 'value');

    t.is('api/model/key/value', myModel.debugger.data.lastUrl);

    myModel.collection.findBy('key', 'value');

    t.is('api/models/key/value', myModel.debugger.data.lastUrl);

});

var testModel = new Rapid({
    modelName: 'testModel',
    debug: true,
    suffixes: {
        create: 'new',
        update: 'save',
        destroy: 'delete',
    }
});

testModel.debugger.logEnabled = false;

test('that create will have the correct url', t => {
    testModel.create({});
    t.is('api/test-model/new', testModel.debugger.data.lastUrl);
});

test('that update will work', t => {
    testModel.update({});
    t.is('api/test-model/save', testModel.debugger.data.lastUrl);

    testModel.update(12345, {});
    t.is('api/test-model/12345/save', testModel.debugger.data.lastUrl);
});

test('that destroy will work', t => {
    testModel.destroy({});
    t.is('api/test-model/delete', testModel.debugger.data.lastUrl);

    testModel.destroy(12345, {});
    t.is('api/test-model/12345/delete', testModel.debugger.data.lastUrl);
});
