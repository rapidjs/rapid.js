import Rapid from './../src/rapid';

class GalleryWrapper extends Rapid {
  boot() {
    this.config.baseURL = 'https://mysite.com/api';
    this.$setConfig('modelName', 'Gallery');
  }

  tagSearch(query) {
    return this.append('tagsearch').withParam('query', query);
  }

  categorySearch(query) {
    return this.append('categorysearch').withParam('query', query);
  }

  paginate(pagination) {
    return this.withParams(pagination);
  }

  taxonomy(taxonomy) {
    return this.append(taxonomy);
  }

  json() {
    return this.append('json');
  }

  xml() {
    return this.append('xml');
  }
}

describe('Extending and creating a wrapper', () => {
  const wrapper = new GalleryWrapper({
    globalParameters: {
      key: 'YOUR_API_KEY',
    },
    debug: true,
  });
  wrapper.debugger.logEnabled = false;

  it('should generate proper urls from the wrapper methods', () => {
    wrapper.tagSearch('orange').json().get();
    expect(wrapper.debugger.data.lastUrl).toBe('https://mysite.com/api/gallery/tagsearch/json?query=orange&key=YOUR_API_KEY');

    wrapper.categorySearch('nature').xml().get();
    expect(wrapper.debugger.data.lastUrl).toBe('https://mysite.com/api/gallery/categorysearch/xml?query=nature&key=YOUR_API_KEY');


    wrapper.id(45).taxonomy('tags').json().get();
    expect(wrapper.debugger.data.lastUrl).toBe('https://mysite.com/api/gallery/45/tags/json?key=YOUR_API_KEY');


    wrapper.id(45).taxonomy('categories').xml().get();
    expect(wrapper.debugger.data.lastUrl).toBe('https://mysite.com/api/gallery/45/categories/xml?key=YOUR_API_KEY');

    wrapper.id(45).paginate({ page: 1, perPage: 20 }).xml().get();
    expect(wrapper.debugger.data.lastUrl).toBe('https://mysite.com/api/gallery/45/xml?page=1&perPage=20&key=YOUR_API_KEY');
  });
});
