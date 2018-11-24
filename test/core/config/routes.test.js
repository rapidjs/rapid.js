import { createRapid } from '../helpers';

describe('Routes are generated properly based off config', () => {
  it('should kebab-case a modelName', () => {
    const trail = createRapid({
      modelName: 'PacificCrestTrail',
    });

    trail.find(1).then(response => {
      expect(response.url).toBe('api/pacific-crest-trail/1');
    });

    trail.all().then(response => {
      expect(response.url).toBe('api/pacific-crest-trails');
    });
  });

  it('should swap the default delimeter if one is passed', () => {
    const trail = createRapid({
      modelName: 'PacificCrestTrail',
      routeDelimeter: '_',
    });

    trail.find(1).then(response => {
      expect(response.url).toBe('api/pacific_crest_trail/1');
    });

    trail.all().then(response => {
      expect(response.url).toBe('api/pacific_crest_trails');
    });
  });

  it('should swap the default delimeter if one is passed', () => {
    const trail = createRapid({
      modelName: 'PacificCrestTrail',
      caseSensitive: true,
    });

    trail.find(1).then(response => {
      expect(response.url).toBe('api/PacificCrestTrail/1');
    });

    trail.all().then(response => {
      expect(response.url).toBe('api/PacificCrestTrails');
    });
  });
});

describe('model, collection, and default routes', () => {
  const trail = createRapid({
    modelName: 'trail',
  });

  describe('.model', () => {
    it('should set routes to the singular model route', () => {
      trail.model.get('/foo').then(response => {
        expect(response.url).toBe('api/trail/foo');
      });
    });
  });

  describe('.collection', () => {
    it('should set routes to the plural collection route', () => {
      trail.collection.get('/foo').then(response => {
        expect(response.url).toBe('api/trails/foo');
      });
    });
  });

  describe('.default', () => {
    const foo = createRapid({
      modelName: 'bar',
      defaultRoute: 'collection',
    });

    it('should set the route back to the default route set in the config', () => {
      foo.default.get('/foo').then(response => {
        expect(response.url).toBe('api/bars/foo');
      });
    });
  });
});

