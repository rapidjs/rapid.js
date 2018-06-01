import { createRapid } from '../helpers';

const anotherMock = createRapid({
  modelName: 'photoAlbum',
  methods: {
    create: 'put',
    update: 'patch',
    destroy: 'delete',
    restore: 'post',
  },
});

describe('Config: Request Method Types', () => {
  it('should overwrite default request method for create()', () => {
    anotherMock.create({}).then(response => {
      expect(response.requestType).toBe('put');
    });
  });

  it('should overwrite default request method for update()', () => {
    anotherMock.update(10, {}).then(response => {
      expect(response.requestType).toBe('patch');
    });
  });

  it('should overwrite default request method for delete()', () => {
    anotherMock.destroy(45).then(response => {
      expect(response.requestType).toBe('delete');
    });
  });

  it('should overwrite default request method for restore()', () => {
    anotherMock.restore(23).then(response => {
      expect(response.requestType).toBe('post');
    });
  });
});
