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
  it('should overwrite default request suffixe for create()', () => {
    anotherMock.create({}).then(response => {
      expect(response.url).toBe('api/photo-album/new');
    });
  });

  it('should overwrite default request suffixe for update()', () => {
    anotherMock.update(10, {}).then(response => {
      expect(response.url).toBe('api/photo-album/10/save');
    });
  });

  it('should overwrite default request suffixe for destroy()', () => {
    anotherMock.destroy(45).then(response => {
      expect(response.url).toBe('api/photo-album/45/delete');
    });
  });

  it('should overwrite default request suffixe for restore()', () => {
    anotherMock.restore(23).then(response => {
      expect(response.url).toBe('api/photo-album/23/undelete');
    });
  });
});
