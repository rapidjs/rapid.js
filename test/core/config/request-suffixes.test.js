import { createRapid } from '../helpers';

const anotherMock = createRapid({
  modelName: 'photoAlbum',
  suffixes: {
    create: 'new',
    update: 'save',
    destroy: 'delete',
    restore: 'undelete',
  },
});

describe('Config: Request Suffixes', () => {
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
});
