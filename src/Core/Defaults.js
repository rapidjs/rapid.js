export default {
    modelName: '',

    primaryKey: '',

    baseURL: 'api',

    trailingSlash: false,

    caseSensitive: false,

    routeDelimeter: '-',

    globalParameters: {

    },

    suffixes: {
        create : 'create',
        update : 'update',
        destroy : 'destroy',
    },

    methods: {
        create : 'post',
        update : 'post',
        destroy : 'post'
    },

    routes: {
        model      : '',
        collection : '',
        any        : ''
    },

    defaultRoute: 'model',

    debug: false,

    apiConfig: {

    },

    allowedRequestTypes: ['get', 'post', 'put', 'patch', 'head', 'delete'],

    beforeRequest (type, url) {

    },

    afterRequest (response) {

    },

    onError (response) {

    }
};
