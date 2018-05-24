import Request from './request';

import { UrlMixin } from './mixins/url';
import { CrudMixin } from './mixins/crud';
import { CustomRoutesMixin } from './mixins/custom-routes';

class Rapid extends Request {
  constructor(config) {
    super(config);
  }
}

UrlMixin(Rapid);
CrudMixin(Rapid);
CustomRoutesMixin(Rapid);

export default Rapid;
