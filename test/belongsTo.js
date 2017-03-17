import test from 'ava';
import Rapid from './../resources/assets/js/Interface/Rapid/Rapid';

test('works with a string', t => {

    let myModel = new Rapid({
        modelName: 'comment',
        debug: true
    });

    myModel.debugger.logEnabled = false;

    myModel.collection.belongsTo('post', 1234, false).get();

    t.is('api/post/1234/comments', myModel.debugger.data.lastUrl);

    myModel.belongsTo('post', 1234, 'id').get();

    t.is('api/post/id/1234/comment', myModel.debugger.data.lastUrl);

    myModel.belongsTo('post', 1234, 'id', 'premium').get();

    t.is('api/post/id/1234/comment/premium', myModel.debugger.data.lastUrl);

    myModel.belongsTo('post', 1234, 'id', ['premium', 'latest', 'desc']).get();

    t.is('api/post/id/1234/comment/premium/latest/desc', myModel.debugger.data.lastUrl);

});

test('works with an object', t => {
    let GearList = new Rapid({ modelName: 'GearList', debug: true }),
        Item = new Rapid({ modelName: 'Item', debug: true });

    Item.belongsTo(GearList , 123).get();

    t.is('api/gear-list/123/item', Item.debugger.data.lastUrl);

    Item.belongsTo(GearList , 456, 'id').get();

    t.is('api/gear-list/id/456/item', Item.debugger.data.lastUrl);

    Item.belongsTo(GearList , 789, '', 'active').get();

    t.is('api/gear-list/789/item/active', Item.debugger.data.lastUrl);

    Item.belongsTo(GearList , 101, '', ['status', 'active']).get();

    t.is('api/gear-list/101/item/status/active', Item.debugger.data.lastUrl);
});



class Comment extends Rapid {
    boot () {
        this.addRelationship('belongsTo', new Rapid({ modelName: 'Thread', debug: true }))
        this.addRelationship('belongsTo', 'photo')
    }
}

var commentModel = new Comment({ modelName: 'Comment', debug: true });

test('addRelationship works', t => {
    commentModel.collection.thread().get();

    t.is('api/thread/comments', commentModel.debugger.data.lastUrl);

    commentModel.thread(123).get();

    t.is('api/thread/123/comment', commentModel.debugger.data.lastUrl);

    commentModel.relationships.thread.find(12);

    t.is('api/thread/12', commentModel.relationships.thread.debugger.data.lastUrl);

    commentModel.photo(1234, 'id').get();

    t.is('api/photo/id/1234/comment', commentModel.debugger.data.lastUrl);
});


test.todo('make sure that by default a collection url is used');
