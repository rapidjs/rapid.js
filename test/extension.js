import test from 'ava';
import Rapid from './../src/rapid';

const doc = new Rapid({
    modelName: 'document',
    extension: 'xml',
    debug: true
});

doc.debugger.logEnabled = false;

test('CRUD works with extension', t => {

    doc.id(23).find();
    t.is('api/document/23.xml', doc.debugger.data.lastUrl);

    doc.id(234).save({});
    t.is('api/document/234/update.xml', doc.debugger.data.lastUrl);

    doc.id(456).destroy();
    t.is('api/document/456/destroy.xml', doc.debugger.data.lastUrl);

});


const issue = new Rapid({
    modelName: 'issue',
    defaultRoute: 'collection',
    extension: 'json',
    debug: true
});

issue.debugger.logEnabled = false;

test('works with extension', t => {

    issue.get();
    t.is('api/issues.json', issue.debugger.data.lastUrl);

    issue.post();
    t.is('api/issues.json', issue.debugger.data.lastUrl);

    issue.id(234).get();
    t.is('api/issues/234.json', issue.debugger.data.lastUrl);

});
