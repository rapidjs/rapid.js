import { createRapid } from './helpers';


const fakeModel = createRapid({
  modelName: 'shark',
});

describe('id()', () => {
  describe('CRUD', () => {
    it('should append an id with the find() method', () => {
      fakeModel.id(23).find().then(response => {
        expect(response.url).toBe('api/shark/23');
      });
    });

    it('should append an id with the between the model name and suffix for the save() method', () => {
      fakeModel.id(234).save().then(response => {
        expect(response.url).toBe('api/shark/234/update');
      });
    });

    it('should append an id with the between the model name and suffix for the destroy() method', () => {
      fakeModel.id(456).destroy().then(response => {
        expect(response.url).toBe('api/shark/456/destroy');
      });
    });
  });

  describe('Basic Request Methods', () => {
    it('should append an id with the get() method', () => {
      fakeModel.id(23).get().then(response => {
        expect(response.url).toBe('api/shark/23');
      });
    });

    it('should append an id with the post() method', () => {
      fakeModel.id(23).post().then(response => {
        expect(response.url).toBe('api/shark/23');
      });
    });

    it('should append an id with the delete() method', () => {
      fakeModel.id(23).delete().then(response => {
        expect(response.url).toBe('api/shark/23');
      });
    });

    it('should append an id with the put() method', () => {
      fakeModel.id(23).put().then(response => {
        expect(response.url).toBe('api/shark/23');
      });
    });

    it('should append an id with the patch() method', () => {
      fakeModel.id(23).patch().then(response => {
        expect(response.url).toBe('api/shark/23');
      });
    });
  });
});
