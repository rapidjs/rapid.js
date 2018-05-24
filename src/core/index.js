import Request from './request';

import { CrudMixin } from './crud-mixin';

class Rapid extends Request {
  constructor(config) {
    super(config);
  }
}

CrudMixin(Rapid);

export default Rapid;
