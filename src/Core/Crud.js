/**
 * All the CRUD
 */

import Request from './Request';

class Crud extends Request {
    /**
     * Model Only Functions
     */

    /**
     * Make a GET request to a url that would retrieve a single model.
     * Prepends primaryKey if set
     *
     * @param id The model's id
     */
    find (id) {
        return this.model.id(id).get();
    }

    /**
     * Make a request to update or destroy a model
     *
     * @param method The method (update or destroy)
     * @param ...params Can be either (id, data) OR (data)
     */
    updateOrDestroy(method, ...params) {
        let urlParams = [],
            id        = params[0],
            data      = params[1];

        if(Number.isInteger(id)) {
            this.id(id);
        } else {
            data    = params[0];
        }

        if(this.config.suffixes[method]) {
            urlParams.push(this.config.suffixes[method]);
        }

        if(method == 'update') {
            this.withParams(data);
        }

        return this.model.buildRequest(this.config.methods[method], urlParams);
    }

    /**
     * See updateOrDestroy
     */
    update (...params) {
        return this.updateOrDestroy('update', ...params);
    }

    /**
     * Alias of update
     * See updateOrDestroy
     */
    save (...params) {
        return this.update(...params);
    }

    /**
     * See updateOrDestroy
     */
    destroy (...params) {
        return this.updateOrDestroy('destroy', ...params);
    }

    /**
     * Makes a request to create a new model based off the method and suffix for create
     *
     * @param data The data to be sent over for creation of model
     */
    create (data) {
        return this.withParams(data).buildRequest(this.config.methods.create, this.config.suffixes.create);
    }

    /**
     * This sets an id for a request
     * currently it doens't work with any of the CRUD methods.
     * It should work with this.
     *
     * @param id The id of the model
     */
    id (id) {
        let params = [];

        if(this.config.primaryKey) {
            params = [this.config.primaryKey, id];
        } else {
            params = [id];
        }

        // needs to prepend
        this.prepend(params);

        return this;
    }


    /**
     * Collection Only Functions
     */

    /**
     * Makes a GET request on a collection route
     */
    all () {
        return this.collection.get();
    }

    /**
     * Collection and Model functions
     */

    /**
     * Makes a GET request to find a model/collection by key, value
     *
     * @param key The key to search by
     * @param value The value to search by
     */
    findBy (key, value) {
        let urlParams = [key];

        if(value) {
            urlParams.push(value);
        }

        return this.get(...urlParams);
    }
}

export default Crud;
