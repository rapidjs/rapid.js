import test from 'ava';
import sinon from 'sinon';
import Rapid from './../src/rapid';

const lobster = new Rapid({ debug: true, modelName: 'Lobster', baseURL: 'http://maine.com/ocean/' });

test('get() works', (t) => {

    lobster.get('butter');

    t.true((lobster.debugger.data.lastRequest.type === 'get'));

    t.is('http://maine.com/ocean/lobster/butter', lobster.debugger.data.lastUrl);

    lobster.collection.get('butter', 'salt');
    t.is('http://maine.com/ocean/lobsters/butter/salt', lobster.debugger.data.lastUrl);

    lobster.get('butter', 'salt', 'crackers');
    t.is('http://maine.com/ocean/lobster/butter/salt/crackers', lobster.debugger.data.lastUrl);

});

test('post() works', (t) => {

    lobster.post('butter');

    t.true((lobster.debugger.data.lastRequest.type === 'post'));

    t.is('http://maine.com/ocean/lobster/butter', lobster.debugger.data.lastUrl);

    lobster.collection.post('butter', 'salt');
    t.is('http://maine.com/ocean/lobsters/butter/salt', lobster.debugger.data.lastUrl);

    lobster.post('butter', 'salt', 'crackers');
    t.is('http://maine.com/ocean/lobster/butter/salt/crackers', lobster.debugger.data.lastUrl);

});

test('head() works', (t) => {

    lobster.head('butter');

    t.true((lobster.debugger.data.lastRequest.type === 'head'));

    t.is('http://maine.com/ocean/lobster/butter', lobster.debugger.data.lastUrl);

    lobster.collection.head('butter', 'salt');
    t.is('http://maine.com/ocean/lobsters/butter/salt', lobster.debugger.data.lastUrl);

    lobster.head('butter', 'salt', 'crackers');
    t.is('http://maine.com/ocean/lobster/butter/salt/crackers', lobster.debugger.data.lastUrl);

});

test('put() works', (t) => {

    lobster.put('butter');

    t.true((lobster.debugger.data.lastRequest.type === 'put'));

    t.is('http://maine.com/ocean/lobster/butter', lobster.debugger.data.lastUrl);

    lobster.collection.put('butter', 'salt');
    t.is('http://maine.com/ocean/lobsters/butter/salt', lobster.debugger.data.lastUrl);

    lobster.put('butter', 'salt', 'crackers');
    t.is('http://maine.com/ocean/lobster/butter/salt/crackers', lobster.debugger.data.lastUrl);

});

test('patch() works', (t) => {

    lobster.patch('butter');

    t.true((lobster.debugger.data.lastRequest.type === 'patch'));

    t.is('http://maine.com/ocean/lobster/butter', lobster.debugger.data.lastUrl);

    lobster.collection.patch('butter', 'salt');
    t.is('http://maine.com/ocean/lobsters/butter/salt', lobster.debugger.data.lastUrl);

    lobster.patch('butter', 'salt', 'crackers');
    t.is('http://maine.com/ocean/lobster/butter/salt/crackers', lobster.debugger.data.lastUrl);

});

test('delete() works', (t) => {

    lobster.delete('butter');

    t.true((lobster.debugger.data.lastRequest.type === 'delete'));

    t.is('http://maine.com/ocean/lobster/butter', lobster.debugger.data.lastUrl);

    lobster.collection.delete('butter', 'salt');
    t.is('http://maine.com/ocean/lobsters/butter/salt', lobster.debugger.data.lastUrl);

    lobster.delete('butter', 'salt', 'crackers');
    t.is('http://maine.com/ocean/lobster/butter/salt/crackers', lobster.debugger.data.lastUrl);

});

test('afterRequest gets fired', (t) => {
    const callback = sinon.spy();
    const Crab = new Rapid({
        debug: true,
        modelName: 'Crab',
        baseURL: 'http://maryland.com/bay/',
        afterRequest() {
            callback();
        },
    });

    Crab.find(1);

    t.truthy(callback.called);
});

test('beforeRequest gets fired', (t) => {
    const callback = sinon.spy();
    const Crab = new Rapid({
        debug: true,
        modelName: 'Crab',
        baseURL: 'http://maryland.com/bay/',
        beforeRequest() {
            callback();
        },
    });

    Crab.find(1);

    t.truthy(callback.called);
});
