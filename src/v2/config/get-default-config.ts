import { Rapid } from './types';

export function getDefaultConfig(): Rapid.Config {
  return {
    /**
     * The possible allowed request types.
     *
     * @type {Array}
     */
    allowedRequestTypes: [
      Rapid.RequestType.Get,
      Rapid.RequestType.Post,
      Rapid.RequestType.Put,
      Rapid.RequestType.Patch,
      Rapid.RequestType.Head,
      Rapid.RequestType.Delete,
    ],

    /**
     * The baseURL for the requests.
     *
     * @type {String}
     */
    baseURL: '',

    /**
     * Whether or not the routes should be case sensitive.
     *
     * @type {Boolean}
     */
    caseSensitive: false,

    // @ts-ignore
    http: undefined,

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
     * The route delimeter that handles splitting routes:
     * e.g. /api/my-model/create
     *
     * @type {String}
     */
    routeDelimeter: '-',

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
  };
}
