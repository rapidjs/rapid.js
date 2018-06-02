import { createRapid } from '../helpers';

const mockDoc = createRapid({
  modelName: 'document',
  extension: 'json',
});

describe('Config: extension', () => {
  describe('CRUD Methods', () => {
    it('should append an extension to the find() method', () => {
      mockDoc.find(1234).then(response => {
        expect(response.url).toBe('api/document/1234.json');
      });
    });

    it('should append an extension to the update() method', () => {
      mockDoc.update(4567).then(response => {
        expect(response.url).toBe('api/document/4567/update.json');
      });
    });

    it('should append an extension to the destroy() method', () => {
      mockDoc.destroy(1234).then(response => {
        expect(response.url).toBe('api/document/1234/destroy.json');
      });
    });

    it('should append an extension to the restore() method', () => {
      mockDoc.restore(1234).then(response => {
        expect(response.url).toBe('api/document/1234/restore.json');
      });
    });
  });

  describe('Basic Request Methods', () => {
    const issue = createRapid({
      modelName: 'issue',
      defaultRoute: 'collection',
      extension: 'json',
    });

    it('should add an extension with the get() method', () => {
      issue.get().then(response => {
        expect(response.url).toBe('api/issues.json');
      });
    });

    it('should add an extension with the post() method', () => {
      issue.post().then(response => {
        expect(response.url).toBe('api/issues.json');
      });
    });

    it('should add an extension with the id() method prefixed on get()', () => {
      issue.id(2).get().then(response => {
        expect(response.url).toBe('api/issues/2.json');
      });
    });
  });
});
