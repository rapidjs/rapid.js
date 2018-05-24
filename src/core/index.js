import { UrlMixin } from './mixins/url';
import { CrudMixin } from './mixins/crud';
import { CustomRoutesMixin } from './mixins/custom-routes';
import Rapid from './request';

UrlMixin(Rapid);
CrudMixin(Rapid);
CustomRoutesMixin(Rapid);

export default Rapid;
