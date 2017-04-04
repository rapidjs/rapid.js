import test from 'ava';
import Rapid from './../resources/assets/js/Interface/Rapid/Rapid';

let postModel = new Rapid({
    modelName: 'post',
    debug: true
});

postModel.debugger.logEnabled = false;

test('that withParams works', t => {

    postModel.collection.withParams({ limit: 20 }).findBy('category', 'featured');

    t.is('api/posts/category/featured?limit=20', postModel.debugger.data.lastUrl);

});

test('that withParam works', t => {

    postModel.withParam('status', 'published').get();

    t.is('api/post?status=published', postModel.debugger.data.lastUrl);

    postModel.collection.withParam('status', 'published').findBy('category', 'featured');

    t.is('api/posts/category/featured?status=published', postModel.debugger.data.lastUrl);

});

test('that withData works', t => {

    postModel.collection.withData({ params: { limit: 20, published: true, orderBy: 'commentCount', order: 'desc' } }).findBy('category', 'featured');

    t.is('api/posts/category/featured?limit=20&published=true&orderBy=commentCount&order=desc', postModel.debugger.data.lastUrl);

});
