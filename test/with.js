import test from 'ava';

test.todo('that with will work');
test.todo('that withParams will work');
test.todo('that withParam will work');
test.todo('that withOptions will work');
test.todo('that withOption will work');


//
// let postModel = new Rapid({
//     modelName: 'post',
//     debug: true
// });
//
// postModel.debugger.logEnabled = false;
//
// test('that withParams works', t => {
//
//     postModel.collection.withParams({ limit: 20 }).findBy('category', 'featured');
//
//     t.is('api/posts/category/featured?limit=20', postModel.debugger.data.lastUrl);
//
// });
//
// test('that withParam works', t => {
//
//     postModel.withParam('status', 'published').get();
//
//     t.is('api/post?status=published', postModel.debugger.data.lastUrl);
//
//     postModel.collection.withParam('status', 'published').findBy('category', 'featured');
//
//     t.is('api/posts/category/featured?status=published', postModel.debugger.data.lastUrl);
//
// });
//
// test('that with works', t => {
//
//     postModel.collection.with({ params: { limit: 20, published: true, orderBy: 'commentCount', order: 'desc' } }).findBy('category', 'featured');
//
//     t.is('api/posts/category/featured?limit=20&published=true&orderBy=commentCount&order=desc', postModel.debugger.data.lastUrl);
//
// });
