# rapid.js (alpha)
A Fluent Interface To Rapidly Interact With APIs 
Create simple, resusable, and cleaner wrappers and interfaces for your API requests.

Read the official docs at [http://rapidjs.io](http://rapidjs.io).

### Define Simple Models
```js
var Post = new Rapid({ modelName: 'Post' });

Post.find(1).then((response) => {
    // GET => /api/post/1
});

Post.collection.findBy('category', 'featured').then((response) => {
    // GET => /api/posts/category/featured
});

Post.withParams({ limit: 20, order: 'desc' }).all().then((response) => {
    // GET => /api/posts?limit=20&order=desc
});

Post.update(25, { title: 'Rapid JS Is Awesome!' })
    // POST => /api/posts/25/update

Post.destroy(9)
    // POST => /api/posts/9/destroy
```

### Easily Customize Your API Requests
```js
var Post = new Rapid({
    modelName: 'Post',
    suffixes: {
        destroy: '',
        update: 'save'
    },
    methods: {
        destroy: 'delete'
    },
    trailingSlash: true
 });

Post.update(25, { title: 'Rapid JS Is Awesome!' })
    // POST => /api/posts/25/save/

Post.destroy(9)
    // DELETE => /api/posts/9/
```

### Create Reusable Base Models
```js
class Base extends Rapid {
    boot () {
        this.baseURL = 'https://myapp.com/api';
        this.config.globalParameters = { key: 'MY_API_KEY' }
    }
}

var Photo = new Base({ modelName: 'Photo' });
var Gallery = new Base({ modelName: 'Gallery' });
var Tag = new Base({ modelName: 'Tag' });

Photo.find(1)
    // GET => https://myapp.com/api/photo/1?key=MY_API_KEY

Tag.collection.findBy('color', 'red')
    // GET => https://myapp.com/api/tags/color/red?key=MY_API_KEY

Gallery.id(23).get('tags', 'nature')
    // GET => https://myapp.com/api/gallery/23/tag/nature?key=MY_API_KEY
```

### Write API Wrappers For Your Endpoints
```js
class GalleryWrapper extends Rapid {
    boot () {
        this.baseURL = 'https://myapp.com/gallery/api';
        this.modelName = 'Gallery';
    }

    tagSearch (query) {
        return this.url('tagsearch').withParam('query', query);
    }

    json () {
        return this.url('json');
    }
}

var Gallery = new GalleryWrapper({
    globalParameters: { key: 'MY_API_KEY' }
});

Gallery.tagSearch('nature').json().get().then(...);
    // GET https://myapp.com/gallery/api/tagsearch/json?query=nature&key=MY_API_KEY
```    

Read the official docs at [http://rapidjs.io](http://rapidjs.io).
