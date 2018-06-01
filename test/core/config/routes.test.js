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

