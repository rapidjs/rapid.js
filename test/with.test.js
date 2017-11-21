import { createModel } from './helpers';

const postModel = createModel({
    modelName: 'post',
});

describe('The with methods all work as should', () => {
    it('that withParams works', () => {
        postModel.collection.withParams({ limit: 20 }).findBy('category', 'featured');

        expect(postModel.debugger.data.lastUrl).toBe('api/posts/category/featured?limit=20');
    });

    it('that withParam works', () => {
        postModel.withParam('status', 'published').get();

        expect(postModel.debugger.data.lastUrl).toBe('api/post?status=published');

        postModel.collection.withParam('status', 'published').findBy('category', 'featured');

        expect(postModel.debugger.data.lastUrl).toBe('api/posts/category/featured?status=published');
    });

    it('that withData works', () => {
        postModel.collection.withData({
            params: {
                limit: 20, published: true, orderBy: 'commentCount', order: 'desc',
            },
        }).findBy('category', 'featured');

        expect(postModel.debugger.data.lastUrl).toBe('api/posts/category/featured?limit=20&published=true&orderBy=commentCount&order=desc');
    });
});
