export default {
  /**
   * The possible allowed request types.
   *
   * @type {Array}
   */
  allowedRequestTypes: ['get', 'post', 'put', 'patch', 'head', 'delete'],

  /**
   * Any config to be passed to axios.
   *
   * @type {Object}
   */
  apiConfig: {},

  /**
   * The baseURL for the requests.
   *
   * @type {String}
   */
  baseURL: 'api',

  /**
   * Whether or not the routes should be case sensitive.
   *
   * @type {Boolean}
   */
  caseSensitive: false,

  /**
   * Any custom routes to be generated.
   *
   * @type {Array}
   */
  customRoutes: [],

  /**
   * Whether or not debug should be on.
   *
   * @type {Boolean}
   */
  debug: false,

  /**
   * The default route. Can be model|collection.
   *
   * @type {String}
   */
  defaultRoute: 'model',

  /**
   * An optional extension to have on the end of each request (.json).
   *
   * @type {String}
   */
  extension: '',

  /**
   * An optional set of request parameters to be global and attached to every request.
   *
   * @type {Object}
   */
  globalParameters: {},

  /**
   * An optional collection of interceptors for requests and responses.
   *
   * @type {Object}
   * @see https://github.com/axios/axios#interceptors
   */
  interceptors: {
    request: [],
    response: [],
  },

  /**
   * The default request methods for the CRUD methods.
   *
   * @type {Object}
   */
  methods: {
    create: 'post',
    update: 'post',
    destroy: 'post',
    restore: 'post',
  },

  /**
   * The modelName that determines the paths of all the routes generated.
   * by Rapid.
   *
   * @type {String}
   */
  modelName: '',

  /**
   * An optional prefix for a primary key to be present in the urls.
   * e.g. /api/my-model/id/1/update
   *
   * @type {String}
   */
  primaryKey: '',

  /**
   * The route delimeter that handles splitting routes:
   * e.g. /api/my-model/create
   *
   * @type {String}
   */
  routeDelimeter: '-',

  /**
   * The default route values for model, collection, and any.
   * This is handled by default, but can be overridden here.
   *
   * Ex. Blog =>
   *  model: 'blog',
   *  collection: 'blogs',
   *  any: ''
   *
   * @type {Object}
   */
  routes: {
    model: '',
    collection: '',
    any: '',
  },

  /**
   * The default request suffixes for the CRUD methods.
   *
   * @type {Object}
   */
  suffixes: {
    create: 'create',
    update: 'update',
    destroy: 'destroy',
    restore: 'restore',
  },

  /**
   * Whether or not a trailing slash should be present on urls.
   *
   * @type {Boolean}
   */
  trailingSlash: false,

  // eslint-disable-next-line no-unused-vars
  beforeRequest(type, url) {},

  // eslint-disable-next-line no-unused-vars
  afterRequest(response) {},

  // eslint-disable-next-line no-unused-vars
  onError(response) {},
};
