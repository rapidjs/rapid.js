import { Mockid } from '../../src/debug/mockid';
import Rapid from '../../src/core';

export const createRapid = config => {
  const mockHttp = new Mockid();
  const mockModel = new Rapid(Object.assign(config, { http: mockHttp }));

  mockHttp.install(mockModel);

  return mockModel;
};
