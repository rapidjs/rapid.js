import test from 'ava';
import Rapid from './../resources/assets/js/Interface/Rapid/Rapid';


//
// addRelationship with all of the above

var Fruit = new Rapid({ modelName: 'Fruit', debug: true });

var myModel = new Rapid({
    modelName: 'model',
    debug: true
});

test('works with a string', t => {

    myModel.hasMany('posts', 123).get();

    t.is('api/model/123/posts', myModel.debugger.data.lastUrl);

    myModel.hasMany('posts', 43, 'public').get();

    t.is('api/model/43/posts/public', myModel.debugger.data.lastUrl);

});

var Fruit = new Rapid({ modelName: 'Fruit', debug: true });

test('works with an object', t => {
    myModel.hasMany(Fruit , 123).get();

    t.is('api/model/123/fruits', myModel.debugger.data.lastUrl);

    myModel.hasMany(Fruit , 456, 'grape').get();

    t.is('api/model/456/fruits/grape', myModel.debugger.data.lastUrl);
});


class Post extends Rapid {
    boot () {
        this.addRelationship('hasMany', new Rapid({ modelName: 'Comment', debug: true }))
        this.addRelationship('hasMany', 'categories')
    }
}

var postModel = new Post({ modelName: 'Post', debug: true });

test('addRelationship works', t => {
    postModel.comments().get();

    t.is('api/post/comments', postModel.debugger.data.lastUrl);

    postModel.comments(123).get();

    t.is('api/post/123/comments', postModel.debugger.data.lastUrl);

    postModel.categories(1234, 'all').get();

    t.is('api/post/1234/categories/all', postModel.debugger.data.lastUrl);

    postModel.relationships.comments.find(12);

    t.is('api/comment/12', postModel.relationships.comments.debugger.data.lastUrl);

});
