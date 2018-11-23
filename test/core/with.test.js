import { createModel, createRapid } from './helpers';

const postModel = createModel({
  modelName: 'post',
});

const fakePostModel = createRapid({
  modelName: 'post',
});

describe('with... Methods', () => {
  describe('withParams()', () => {
    it('should set the parameters before a request', () => {
      const expected = { limit: 20 };

      fakePostModel.withParams({ limit: 20 }).get('/category/featured').then(response => {
        expect(response.requestConfig.params).toEqual(expected);
      });
    });

    it('should flush the parameters after a request is made', () => {
      const expected = { options: {}, params: {} };

      fakePostModel.withParams({ limit: 20, anotherParam: true }).get('/category/featured').then(response => {
        expect(fakePostModel.requestData).toEqual(expected);
      });

      expect(fakePostModel.requestData).toEqual(expected);

      fakePostModel.get('/category/featured').then(secondResponse => {
        expect(fakePostModel.requestData).toEqual(expected);
        expect(secondResponse.requestConfig.params).toEqual({});
      });
    });

    it('will overwrite the current params if it is chained', () => {
      const expected = { limit: 20 };

      fakePostModel
        .withParams({ status: 'published' })
        .withParams({ limit: 20 })
        .get().then(response => {
          expect(response.requestConfig.params).toEqual(expected);
        });
    });
  });

  describe('withParam()', () => {
    it('should set a single parameter before a request', () => {
      const expected = { status: 'published' };

      fakePostModel.withParam('status', 'published').get().then(response => {
        expect(response.requestConfig.params).toEqual(expected);
      });
    });

    it('will merge the params when it is chained', () => {
      const expected = { status: 'published', limit: 20 };

      fakePostModel
        .withParam('status', 'published')
        .withParam('limit', 20)
        .get().then(response => {
          expect(response.requestConfig.params).toEqual(expected);
        });
    });
  });

  describe('withOptions()', () => {

  });

  describe('withOption()', () => {

  });

  describe('withConfig()', () => {
    it('should send params and options to the request', () => {
      const expected = {
        params: {
          limit: 20,
          published: true,
          orderBy: 'commentCount',
          order: 'desc',
        },
        options: { foo: 'bar' },
      };

      fakePostModel
        .withConfig(expected)
        .get()
        .then(response => {
          expect(response.requestConfig).toEqual(expected);
        });
    });
  });

  describe('Works with id()', () => {

  });

  describe('Works with CRUD methods', () => {

  });

  describe('Works with route methods', () => {

  });


  // withOptions
  // withOption
  // withConfig => withConfig (...config)
  // works with ID
  // works with CRUD?

  it('that withConfig works', () => {
    postModel.collection.withConfig({
      params: {
        limit: 20, published: true, orderBy: 'commentCount', order: 'desc',
      },
    }).findBy('category', 'featured');

    expect(postModel.debugger.data.lastUrl).toBe('api/posts/category/featured?limit=20&published=true&orderBy=commentCount&order=desc');
  });
});
