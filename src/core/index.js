// @ts-check
import { InitMixin } from './mixins/init';
import { UrlMixin } from './mixins/url';
import { RequestMixin } from './mixins/request';
import { CrudMixin } from './mixins/crud';
import { CustomRoutesMixin } from './mixins/custom-routes';
import { warn } from '../utils/debug';

function Rapid(config) {
  if (process.env.NODE_ENV !== 'production' &&
    !(this instanceof Rapid)
  ) {
    warn('Rapid is a constructor and should be called with the `new` keyword');
  }

  this._init(config);
}

InitMixin(Rapid);
UrlMixin(Rapid);
RequestMixin(Rapid);
CrudMixin(Rapid);
CustomRoutesMixin(Rapid);

export default Rapid;
