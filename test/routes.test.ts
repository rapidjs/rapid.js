import { createModel } from './helpers';

describe('The routes are generated properly based off config', () => {
  it('that routeDelimiter will work', () => {
    const postModel = createModel({
      modelName: 'PacificCrestTrail',
      routeDelimiter: '_',
    });

    postModel.find(1);
    expect(postModel.debugger.data.lastUrl).toBe('api/pacific_crest_trail/1');

    postModel.all();
    expect(postModel.debugger.data.lastUrl).toBe('api/pacific_crest_trails');
  });

  it('that caseSensitive will work', () => {
    const postModel = createModel({
      modelName: 'PacificCrestTrail',
      caseSensitive: true,
    });

    postModel.find(1);
    expect(postModel.debugger.data.lastUrl).toBe('api/PacificCrestTrail/1');

    postModel.all();
    expect(postModel.debugger.data.lastUrl).toBe('api/PacificCrestTrails');
  });
});

