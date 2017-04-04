import test from 'ava';
import Rapid from './../resources/assets/js/Interface/Rapid/Rapid';

class GalleryWrapper extends Rapid {
    boot () {
        this.baseURL = 'https://mysite.com/api';
        this.modelName = 'Gallery';
    }

    tagSearch (query) {
        return this.append('tagsearch').withParam('query', query);
    }

    categorySearch (query) {
        return this.append('categorysearch').withParam('query', query);
    }

    taxonomy (taxonomy) {
        return this.append(taxonomy);
    }

    json () {
        return this.append('json');
    }

    xml () {
        return this.append('xml');
    }
}

test('extending and creating a wrapper works', t => {
    var Wrapper = new GalleryWrapper({
        globalParameters: {
          key: 'YOUR_API_KEY'
        },
        debug: true
    });

    Wrapper.tagSearch('orange').json().get();
    t.is('https://mysite.com/api/gallery/tagsearch/json?query=orange&key=YOUR_API_KEY', Wrapper.debugger.data.lastUrl);


    Wrapper.categorySearch('nature').xml().get();
    t.is('https://mysite.com/api/gallery/categorysearch/xml?query=nature&key=YOUR_API_KEY', Wrapper.debugger.data.lastUrl);


    Wrapper.id(45).taxonomy('tags').json().get();
    t.is('https://mysite.com/api/gallery/45/tags/json?key=YOUR_API_KEY', Wrapper.debugger.data.lastUrl);


    Wrapper.id(45).taxonomy('categories').xml().get();
    t.is('https://mysite.com/api/gallery/45/categories/xml?key=YOUR_API_KEY', Wrapper.debugger.data.lastUrl);

});
