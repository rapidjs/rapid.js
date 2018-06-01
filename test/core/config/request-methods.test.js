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
