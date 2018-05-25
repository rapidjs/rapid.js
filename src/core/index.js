import { InitMixin } from './mixins/init';
import { UrlMixin } from './mixins/url';
import { RequestMixin } from './mixins/request';
import { CrudMixin } from './mixins/crud';
import { CustomRoutesMixin } from './mixins/custom-routes';
import Rapid from './request';

InitMixin(Rapid);
UrlMixin(Rapid);
RequestMixin(Rapid);
CrudMixin(Rapid);
CustomRoutesMixin(Rapid);

export default Rapid;
