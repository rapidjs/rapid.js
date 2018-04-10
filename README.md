<p align="center">
<img src="https://rapidjs.io/images/rapid-logo-gh-readme.png" />
</p>

[![npm](https://img.shields.io/npm/v/rapid.js.svg?style=flat-square)](https://www.npmjs.com/package/rapid.js)
[![npm](https://img.shields.io/npm/dt/rapid.js.svg?style=flat-square)](https://www.npmjs.com/package/rapid.js)
[![npm](https://img.shields.io/travis/rapidjs/rapid.js.svg?branch=master&style=flat-square)](https://www.npmjs.com/package/rapid.js)

# r**api**d.js

An ORM-like Interface and a Router For Your API Requests

Create simple, reusable, and cleaner wrappers, define custom routes, and more for your API requests.

## Documentation

Read the official docs at [https://rapidjs.io](https://rapidjs.io).

## Installation

Pick your poison:

```shell
yarn add rapid.js
npm i -S rapid.js
npm install --save rapid.js
```

## Overview

- [Define Simple Models](#define-simple-models)
- [Easily Customize Your API Requests](#easily-customize-your-api-requests)
- [Create Reusable Base Models](#create-reusable-base-models)
- [Write API Wrappers For Your Endpoints](#write-api-wrappers-for-your-endpoints)
- [Define Custom Routes (New!)](#define-custom-routes)

### Define Simple Models

```js
const post = new Rapid({ modelName: 'Post' });

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

post.restore(9)
    // POST => /api/posts/9/restore
```

Read more about [Rapid Basics](https://rapidjs.io/docs#usage).

### Easily Customize Your API Requests

```js
const post = new Rapid({
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

Read more about [Customizing Your Requests](https://rapidjs.io/docs#config-builder).

### Create Reusable Base Models

```js
class Base extends Rapid {
    boot () {
        this.baseURL = 'https://myapp.com/api';
        this.config.globalParameters = { key: 'MY_API_KEY' }
    }
}

const photo = new Base({ modelName: 'Photo' });
const gallery = new Base({ modelName: 'Gallery' });
const tag = new Base({ modelName: 'Tag' });

photo.find(1)
    // GET => https://myapp.com/api/photo/1?key=MY_API_KEY

tag.collection.findBy('color', 'red')
    // GET => https://myapp.com/api/tags/color/red?key=MY_API_KEY

gallery.id(23).get('tags', 'nature')
    // GET => https://myapp.com/api/gallery/23/tag/nature?key=MY_API_KEY
```

Read more about [Base Models](https://rapidjs.io/docs#extending-base-models).

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

const gallery = new GalleryWrapper({
    globalParameters: { key: 'MY_API_KEY' }
});

gallery.tagSearch('nature').json().get().then(...);
    // GET https://myapp.com/gallery/api/tagsearch/json?query=nature&key=MY_API_KEY
    // GET https://myapp.com/gallery/api/tagsearch/json?query=nature&key=MY_API_KEY
```

Read more about [Making a Wrapper](https://rapidjs.io/docs#extending-making-a-wrapper).

### Define Custom Routes

```js
const customRoutes = [
    {
        name: 'web_get_user_preferences',
        type: 'get',
        url: '/user/preferences',
    },

    {
        name: 'web_save_user_preferences',
        type: 'post',
        url: '/user/{id}/save/preferences'
    }
];

const router = new Rapid({ customRoutes, baseURL: '/api' });

router.route('web_get_user_preferences').then((response) => {}); 
// GET => /api/user/preferences

router.route('web_save_user_preferences', { id: 12 }, /* { request data } */).then((response) => {}); 
// POST => /api/user/12/save/preferences
```

#### Using Your Own HTTP Service

```js
import http from 'some-http-service';

const customRoutes = [
    {
        name: 'web_login',
        url: '/login'
    },

    {
        name: 'api_save_user_preferences',,
        url: '/user/{id}/save/preferences'
    }
];

const rapid = new Rapid({ customRoutes, baseURL: '' });

rapid.generate('web_login')
// returns '/login'

// use your own service
http.post(rapid.generate('api_save_user_preferences', { id: 1 }), { data }).then()...
```

Read more about [Custom Routes](https://rapidjs.io/docs#custom-routes).

Read the official docs at [https://rapidjs.io](https://rapidjs.io).
