import { createRapid } from './helpers';

const mockModel = createRapid({
  modelName: 'mock',
});

describe('Basic Request Methods', () => {
  it('should fire a basic get request', () => {
    mockModel.get('/some-get-request')
      .then(response => {
        expect(response.url).toBe('api/mock/some-get-request');
        expect(response.requestType).toBe('get');
      });
  });

  it('should fire a basic post request', () => {
    mockModel.post('/some-post-request')
      .then(response => {
        expect(response.url).toBe('api/mock/some-post-request');
        expect(response.requestType).toBe('post');
      });
  });

  it('should fire a basic delete request', () => {
    mockModel.delete('/some-delete-request')
      .then(response => {
        expect(response.url).toBe('api/mock/some-delete-request');
        expect(response.requestType).toBe('delete');
      });
  });

  it('should fire a basic head request', () => {
    mockModel.head('/some-head-request')
      .then(response => {
        expect(response.url).toBe('api/mock/some-head-request');
        expect(response.requestType).toBe('head');
      });
  });

  it('should fire a basic patch request', () => {
    mockModel.patch('/some-patch-request')
      .then(response => {
        expect(response.url).toBe('api/mock/some-patch-request');
        expect(response.requestType).toBe('patch');
      });
  });

  it('should fire a basic put request', () => {
    mockModel.put('/some-put-request')
      .then(response => {
        expect(response.url).toBe('api/mock/some-put-request');
        expect(response.requestType).toBe('put');
      });
  });

  it('should fire a basic options request', () => {
    mockModel.options('/some-options-request')
      .then(response => {
        expect(response.url).toBe('api/mock/some-options-request');
        expect(response.requestType).toBe('options');
      });
  });
});
