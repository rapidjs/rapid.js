import test from 'ava';
import sinon from 'sinon';
import Rapid from './../resources/assets/js/Interface/Rapid/Rapid';

var Lobster = new Rapid({ debug: true, modelName: 'Lobster', baseURL: 'http://maine.com/ocean/' });

test('get() works', t => {

    Lobster.get('butter');

    t.true((Lobster.debugger.data.lastRequest.type == 'get'));

    t.is('http://maine.com/ocean/lobster/butter', Lobster.debugger.data.lastUrl);

    Lobster.collection.get('butter', 'salt');
    t.is('http://maine.com/ocean/lobsters/butter/salt', Lobster.debugger.data.lastUrl);

    Lobster.get('butter', 'salt', 'crackers');
    t.is('http://maine.com/ocean/lobster/butter/salt/crackers', Lobster.debugger.data.lastUrl);

});

test('post() works', t => {

    Lobster.post('butter');

    t.true((Lobster.debugger.data.lastRequest.type == 'post'));

    t.is('http://maine.com/ocean/lobster/butter', Lobster.debugger.data.lastUrl);

    Lobster.collection.post('butter', 'salt');
    t.is('http://maine.com/ocean/lobsters/butter/salt', Lobster.debugger.data.lastUrl);

    Lobster.post('butter', 'salt', 'crackers');
    t.is('http://maine.com/ocean/lobster/butter/salt/crackers', Lobster.debugger.data.lastUrl);

});

test('head() works', t => {

    Lobster.head('butter');

    t.true((Lobster.debugger.data.lastRequest.type == 'head'));

    t.is('http://maine.com/ocean/lobster/butter', Lobster.debugger.data.lastUrl);

    Lobster.collection.head('butter', 'salt');
    t.is('http://maine.com/ocean/lobsters/butter/salt', Lobster.debugger.data.lastUrl);

    Lobster.head('butter', 'salt', 'crackers');
    t.is('http://maine.com/ocean/lobster/butter/salt/crackers', Lobster.debugger.data.lastUrl);

});

test('put() works', t => {

    Lobster.put('butter');

    t.true((Lobster.debugger.data.lastRequest.type == 'put'));

    t.is('http://maine.com/ocean/lobster/butter', Lobster.debugger.data.lastUrl);

    Lobster.collection.put('butter', 'salt');
    t.is('http://maine.com/ocean/lobsters/butter/salt', Lobster.debugger.data.lastUrl);

    Lobster.put('butter', 'salt', 'crackers');
    t.is('http://maine.com/ocean/lobster/butter/salt/crackers', Lobster.debugger.data.lastUrl);

});

test('patch() works', t => {

    Lobster.patch('butter');

    t.true((Lobster.debugger.data.lastRequest.type == 'patch'));

    t.is('http://maine.com/ocean/lobster/butter', Lobster.debugger.data.lastUrl);

    Lobster.collection.patch('butter', 'salt');
    t.is('http://maine.com/ocean/lobsters/butter/salt', Lobster.debugger.data.lastUrl);

    Lobster.patch('butter', 'salt', 'crackers');
    t.is('http://maine.com/ocean/lobster/butter/salt/crackers', Lobster.debugger.data.lastUrl);

});

test('delete() works', t => {

    Lobster.delete('butter');

    t.true((Lobster.debugger.data.lastRequest.type == 'delete'));

    t.is('http://maine.com/ocean/lobster/butter', Lobster.debugger.data.lastUrl);

    Lobster.collection.delete('butter', 'salt');
    t.is('http://maine.com/ocean/lobsters/butter/salt', Lobster.debugger.data.lastUrl);

    Lobster.delete('butter', 'salt', 'crackers');
    t.is('http://maine.com/ocean/lobster/butter/salt/crackers', Lobster.debugger.data.lastUrl);

});

test('afterRequest gets fired', t => {
    let callback = sinon.spy();
    let Crab = new Rapid({
        debug: true,
        modelName: 'Crab',
        baseURL: 'http://maryland.com/bay/',
        afterRequest() {
            callback();
        }
    });

    Crab.find(1);

    t.truthy(callback.called);
});

test('beforeRequest gets fired', t => {
    let callback = sinon.spy();
    let Crab = new Rapid({
        debug: true,
        modelName: 'Crab',
        baseURL: 'http://maryland.com/bay/',
        beforeRequest() {
            callback();
        }
    });

    Crab.find(1);

    t.truthy(callback.called);
});
