import Request from './request';

import { UrlMixin } from './mixins/url';
import { CrudMixin } from './mixins/crud';

class Rapid extends Request {
  constructor(config) {
    super(config);
  }
}

UrlMixin(Rapid);
CrudMixin(Rapid);

export default Rapid;
