import test from 'ava';
import Rapid from './../resources/assets/js/Interface/Rapid/Rapid';

test.todo('belongsToMany with object');
test.todo('belongsToMany with string');

// test('works with a string', t => {
//
//     let myModel = new Rapid({
//         modelName: 'comment',
//         debug: true
//     });
//
//     myModel.debugger.logEnabled = false;
//
//     myModel.collection.belongsToMany('post', 1234, false).get();
//
//     t.is('api/posts/1234/comments', myModel.debugger.data.lastUrl);
//
//     myModel.belongsToMany('post', 1234, 'id').get();
//
//     t.is('api/posts/id/1234/comment', myModel.debugger.data.lastUrl);
//
//     myModel.belongsToMany('post', 1234, 'id', 'premium').get();
//
//     t.is('api/posts/id/1234/comment/premium', myModel.debugger.data.lastUrl);
//
//     myModel.belongsToMany('post', 1234, 'id', ['premium', 'latest', 'desc']).get();
//
//     t.is('api/posts/id/1234/comment/premium/latest/desc', myModel.debugger.data.lastUrl);
//
// });
//
// test('works with an object', t => {
//     let GearList = new Rapid({ modelName: 'GearList', debug: true }),
//         Item = new Rapid({ modelName: 'Item', debug: true });
//
//     Item.belongsToMany(GearList , 123).get();
//
//     t.is('api/gear-lists/123/item', Item.debugger.data.lastUrl);
//
//     Item.belongsToMany(GearList , 456, 'id').get();
//
//     t.is('api/gear-lists/id/456/item', Item.debugger.data.lastUrl);
//
//     Item.belongsToMany(GearList , 789, '', 'active').get();
//
//     t.is('api/gear-lists/789/item/active', Item.debugger.data.lastUrl);
//
//     Item.belongsToMany(GearList , 101, '', ['status', 'active']).get();
//
//     t.is('api/gear-lists/101/item/status/active', Item.debugger.data.lastUrl);
// });
//
//
//
// class Comment extends Rapid {
//     boot () {
//         this.addRelationship('belongsToMany', new Rapid({ modelName: 'Thread', debug: true }))
//         this.addRelationship('belongsToMany', 'photo')
//     }
// }
//
// var commentModel = new Comment({ modelName: 'Comment', debug: true });
//
// test('addRelationship works', t => {
//     commentModel.collection.threads().get();
//
//     t.is('api/threads/comments', commentModel.debugger.data.lastUrl);
//
//     commentModel.threads(123).get();
//
//     t.is('api/threads/123/comment', commentModel.debugger.data.lastUrl);
//
//     commentModel.relationships.threads.find(12);
//
//     t.is('api/threads/12', commentModel.relationships.threads.debugger.data.lastUrl);
//
//     commentModel.photos(1234, 'id').get();
//
//     t.is('api/photos/id/1234/comment', commentModel.debugger.data.lastUrl);
// });
//

test.todo('make sure that by default a collection url is used');
