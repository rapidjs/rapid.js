/**
 * The Caramel Core functionality of Rapid
 */

import axios from 'axios';
import _defaultsDeep from 'lodash.defaultsdeep';

import Defaults from './../Defaults';
import Debugger from './../Debugger';
import Logger from './../Logger';

class Core {
    constructor (config) {
        config = config || {};

        config = _defaultsDeep(config, Defaults);

        this.initialize(config);
    }

    /**
     * Set any config overrides in this method when extending
     */
    boot () {

    }

    /**
     * Setup the all of properties.
     */
    initialize (config) {

        this.config = config;

        this.initializeRoutes();

        this.boot();

        this.resetURLParams();

        this.fireSetters();

        this.initializeAPI();

        this.setCurrentRoute(this.config.defaultRoute);

        this.initializeDebugger();

        this.initializeLogger();

        this.resetRequestData();
    }

    /**
     * Fire the setters. This will make sure the routes are generated properly.
     * Consider if this is really even necessary
     */
    fireSetters () {
        ['baseURL', 'modelName', 'routeDelimeter', 'caseSensitive'].forEach(setter => this[setter] = this.config[setter]);
    }

    /**
     * Initialze the debugger if debug is set to true.
     */
    initializeDebugger () {
        this.debugger = this.config.debug ? new Debugger(this) : false;
    }

    /**
     * Initialze the debugger if debug is set to true.
     */
    initializeLogger () {
        this.logger = this.config.debug ? Logger : false;
    }

    /**
     * Initialize the API.
     */
    initializeAPI () {
        this.api = axios.create(_defaultsDeep({ baseURL: this.config.baseURL.replace(/\/$/, '') }, this.config.apiConfig));
    }

    /**
     * Initialize the routes.
     */
    initializeRoutes () {
        this.routes = {
            model      : '',
            collection : '',
            any        : ''
        };
    }

    /**
     * Resets the request data
     */
    resetRequestData () {
        this.requestData = {
            params: {},
            options: {}
        };
    }

    /**
     * Setters and Getters
     */

    set debug (val) {
        if(this.config.debug) this.logger.warn('debug mode must explicitly be turned on via the constructor in config.debug');
    }

    get collection () {
        this.setCurrentRoute('collection');

        return this;
    }

    get model () {
        this.setCurrentRoute('model');

        return this;
    }

    get any () {
        this.setCurrentRoute('any');

        return this;
    }

    set baseURL (url) {
        this.config.baseURL = this.sanitizeUrl(url);
        this.initializeAPI();
    }

    set modelName (val) {
        this.config.modelName = val;
        this.setRoutes();
    }

    set routeDelimeter (val) {
        this.config.routeDelimeter = val;
        this.setRoutes();
    }

    set caseSensitive (val) {
        this.config.caseSensitive = val;
        this.setRoutes();
    }
}

export default Core;
