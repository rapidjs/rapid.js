import test from 'ava';
import Rapid from './../resources/assets/js/Interface/Rapid/Rapid';

var myModel = new Rapid({
    modelName: 'model',
    debug: true
});

test('works with a string', t => {

    myModel.hasOne('post', 123).get();

    t.is('api/model/123/post', myModel.debugger.data.lastUrl);

    myModel.hasOne('post', 43, 'public').get();

    t.is('api/model/43/post/public', myModel.debugger.data.lastUrl);

});

var Fruit = new Rapid({ modelName: 'Fruit', debug: true });

test('works with an object', t => {
    myModel.hasOne(Fruit , 123).get();

    t.is('api/model/123/fruit', myModel.debugger.data.lastUrl);

    myModel.hasOne(Fruit , 456, 'grape').get();

    t.is('api/model/456/fruit/grape', myModel.debugger.data.lastUrl);
});


class Post extends Rapid {
    boot () {
        this.addRelationship('hasOne', new Rapid({ modelName: 'Author', debug: true }))
        this.addRelationship('hasOne', 'category')
    }
}

var postModel = new Post({ modelName: 'Post', debug: true });

test('addRelationship works', t => {
    postModel.author().get();

    t.is('api/post/author', postModel.debugger.data.lastUrl);

    postModel.author(123).get();

    t.is('api/post/123/author', postModel.debugger.data.lastUrl);

    postModel.category(1234, 'featured').get();

    t.is('api/post/1234/category/featured', postModel.debugger.data.lastUrl);

    postModel.relationships.author.find(12);

    t.is('api/author/12', postModel.relationships.author.debugger.data.lastUrl);

});
