import { createModel, createRapid } from './helpers';


const mockModel = createRapid({
  modelName: 'photoAlbum',
});

describe('CRUD Methods', () => {
  describe('find()', () => {
    it('should make a get request', () => {
      mockModel.find(1).then(response => {
        expect(response.requestType).toBe('get');
      });
    });

    it('should make a request find a model by id', () => {
      mockModel.find(123).then(response => {
        expect(response.url).toBe('api/photo-album/123');
      });
    });
  });

  describe('all()', () => {
    it('should make a get request', () => {
      mockModel.all().then(response => {
        expect(response.requestType).toBe('get');
      });
    });

    it('should make a request to find a collection of items', () => {
      mockModel.all().then(response => {
        expect(response.url).toBe('api/photo-albums');
      });
    });
  });

  describe('findBy()', () => {
    it('should make a get request', () => {
      mockModel.findBy().then(response => {
        expect(response.requestType).toBe('get');
      });
    });

    it('should append a key and value to the request url', () => {
      mockModel.findBy('tag', 'beautiful').then(response => {
        expect(response.url).toBe('api/photo-album/tag/beautiful');
      });
    });

    it('should find by a collection if collection is set instead', () => {
      mockModel.collection.findBy('tag', 'beautiful').then(response => {
        expect(response.url).toBe('api/photo-albums/tag/beautiful');
      });
    });

    it('should do act as an alias of get() if no params are passed', () => {
      mockModel.findBy().then(response => {
        expect(response.url).toBe('api/photo-album');
      });
    });
  });

  describe('create()', () => {
    it('should make a post request', () => {
      mockModel.create({}).then(response => {
        expect(response.requestType).toBe('post');
      });
    });

    it('should make make a request with the model endpoint and suffix', () => {
      mockModel.create({}).then(response => {
        expect(response.url).toBe('api/photo-album/create');
      });
    });

    it('should pass params to the http request config', () => {
      mockModel.create({ name: 'Appalachian Trail 2015' }).then(response => {
        expect(response.requestConfig).toEqual({ name: 'Appalachian Trail 2015' });
      });
    });
  });

  describe('update()', () => {
    it('should make a post request', () => {
      mockModel.update({}).then(response => {
        expect(response.requestType).toBe('post');
      });
    });

    it('should make make a request with the model endpoint and suffix', () => {
      mockModel.update(23, {}).then(response => {
        expect(response.url).toBe('api/photo-album/23/update');
      });
    });

    it('should pass params to the http request config', () => {
      mockModel.update(23, { name: 'Colorado Trail 2016' }).then(response => {
        expect(response.requestConfig).toEqual({ name: 'Colorado Trail 2016' });
      });
    });
  });

  describe('destroy()', () => {
    it('should make a post request', () => {
      mockModel.destroy({}).then(response => {
        expect(response.requestType).toBe('post');
      });
    });

    it('should make make a request with the model endpoint and suffix', () => {
      mockModel.destroy(23, {}).then(response => {
        expect(response.url).toBe('api/photo-album/23/destroy');
      });
    });

    it('should pass params to the http request config', () => {
      mockModel.destroy(23, { name: 'Colorado Trail 2016' }).then(response => {
        expect(response.requestConfig).toEqual({ name: 'Colorado Trail 2016' });
      });
    });
  });

  describe('restore()', () => {
    it('should make a post request', () => {
      mockModel.restore(1).then(response => {
        expect(response.requestType).toBe('post');
      });
    });

    it('should make make a request with the model endpoint and suffix', () => {
      mockModel.restore(23).then(response => {
        expect(response.url).toBe('api/photo-album/23/restore');
      });
    });
  });

  const anotherMock = createRapid({
    modelName: 'photoAlbum',
    suffixes: {
      create: 'new',
      update: 'save',
      destroy: 'delete',
      restore: 'undelete',
    },
    methods: {
      create: 'put',
      update: 'patch',
      destroy: 'delete',
      restore: 'post',
    },
  });

  describe('config suffixes', () => {
    it('should overwrite default request suffixes with config suffixes', () => {
      anotherMock.create({}).then(response => {
        expect(response.url).toBe('api/photo-album/new');
      });

      anotherMock.update(10, {}).then(response => {
        expect(response.url).toBe('api/photo-album/10/save');
      });

      anotherMock.destroy(45).then(response => {
        expect(response.url).toBe('api/photo-album/45/delete');
      });

      anotherMock.restore(23).then(response => {
        expect(response.url).toBe('api/photo-album/23/undelete');
      });
    });

    it('should overwrite default request method types with config method types', () => {
      anotherMock.create({}).then(response => {
        expect(response.requestType).toBe('put');
      });

      anotherMock.update(10, {}).then(response => {
        expect(response.requestType).toBe('patch');
      });

      anotherMock.destroy(45).then(response => {
        expect(response.requestType).toBe('delete');
      });

      anotherMock.restore(23).then(response => {
        expect(response.requestType).toBe('post');
      });
    });
  });
});
