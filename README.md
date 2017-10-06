<p align="center">
<img src="https://rapidjs.io/images/rapid-logo-gh-readme.png" />
</p>

<img src="https://img.shields.io/npm/v/rapid.js.svg" />

An ORM-like Interface For Your Frontend Requests
Create simple, resusable, and cleaner wrappers and interfaces for your API requests.

*This is the first release of rapid and it is still in development. Please report any bugs to the github page.*

Read the official docs at [https://rapidjs.io](https://rapidjs.io).

### Define Simple Models
```js
var post = new Rapid({ modelName: 'Post' });

post.find(1).then((response) => {
    // GET => /api/post/1
});

post.collection.findBy('category', 'featured').then((response) => {
    // GET => /api/posts/category/featured
});

post.withParams({ limit: 20, order: 'desc' }).all().then((response) => {
    // GET => /api/posts?limit=20&order=desc
});

post.update(25, { title: 'Rapid JS Is Awesome!' })
    // POST => /api/posts/25/update

post.destroy(9)
    // POST => /api/posts/9/destroy
```

### Easily Customize Your API Requests
```js
var post = new Rapid({
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

post.update(25, { title: 'Rapid JS Is Awesome!' })
    // POST => /api/posts/25/save/

post.destroy(9)
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

var photo = new Base({ modelName: 'Photo' });
var gallery = new Base({ modelName: 'Gallery' });
var tag = new Base({ modelName: 'Tag' });

photo.find(1)
    // GET => https://myapp.com/api/photo/1?key=MY_API_KEY

tag.collection.findBy('color', 'red')
    // GET => https://myapp.com/api/tags/color/red?key=MY_API_KEY

gallery.id(23).get('tags', 'nature')
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

var gallery = new GalleryWrapper({
    globalParameters: { key: 'MY_API_KEY' }
});

gallery.tagSearch('nature').json().get().then(...);
    // GET https://myapp.com/gallery/api/tagsearch/json?query=nature&key=MY_API_KEY
    // GET https://myapp.com/gallery/api/tagsearch/json?query=nature&key=MY_API_KEY
```    

Read the official docs at [http://rapidjs.io](http://rapidjs.io).
