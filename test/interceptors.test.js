import { createModel } from './helpers';
import { Rapid } from '../src/rapid';

const response = () => 'response';

const request = () => 'request';

const interceptors = {
  response: [response],
  request: [request],
};

class Resource extends Rapid {
  boot() {
    this.interceptors.response.push(response);
    this.interceptors.request.push(request);
  }
}

describe('Interceptors', () => {
  it('should create empty interceptors from `Defaults`', () => {
    const model = createModel({});

    expect(model.interceptors.request).toEqual([]);
    expect(model.interceptors.response).toEqual([]);
  });

  it('should load the defined interceptors', () => {
    const model = createModel({ interceptors });

    expect(model.interceptors).toEqual(interceptors);
  });

  it('should load the interceptors defined in the `boot` function', () => {
    const model = new Resource({});

    expect(model.interceptors.response[0]()).toEqual('response');
    expect(model.interceptors.request[0]()).toEqual('request');
  });
});
