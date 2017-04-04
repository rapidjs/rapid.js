/**
 * Relationship Methods
 */

import _isArray from 'lodash.isarray';
import Request from './Request';
import _camelCase from 'lodash.camelcase';

class Relationships extends Request {

    constructor (config) {
        super(config);
    }

    /**
     * Sets up a hasOne relationship
     * See hasRelationship
     */
    hasOne (relation, primaryKey, foreignKey) {
        return this.hasRelationship('hasOne', relation, primaryKey, foreignKey);
    }

    /**
     * Sets up a hasMany relationship
     * See hasRelationship
     */
    hasMany (relation, primaryKey, foreignKey) {
        return this.hasRelationship('hasMany', relation, primaryKey, foreignKey);
    }

    /**
     * Registers a relationship via the boot() method when extending a model
     *
     * @param type The type of relationship
     * @param relation The relation name OR object
     */
    registerHasRelation (type, relation) {
        let relationRoute = this.getRouteByRelationType(type, relation),
            relationName = this.getRelationshipName(type, relation);

        this.$rels[relationName] = (
            (type, route) => {
                return (primaryKey, foreignKey) => { return this.hasRelationship(type, route, primaryKey, foreignKey); }
            }
        )(type, relationRoute);

        // add to methodRoutes for debugging
        this.methodRoutes.push(relationRoute);

        return this;
    }

    /**
     * Register a "has" Relationship
     *
     * @param type The type of 'has' Relationship (hasOne, hasMany)
     * @param relation The relation. A string or Rapid model
     * @param primaryKey The primaryKey of the relationship
     * @param foreignKey The foreignKey of the relationship
     */
    hasRelationship (type, relation = '', primaryKey = '', foreignKey = '') {
        let urlParams = [];

        relation = this.getRouteByRelationType(type, relation);

        /**
         * No longer do we need to make ...foreignKey an array because we can do .get() ??
         * does that make sense?
         */
        if(_isArray(foreignKey)) {
            urlParams = [primaryKey, relation, ...foreignKey];
        } else {
            urlParams = [primaryKey, relation, foreignKey];
        }

        this.setURLParams(urlParams, false, true);

        return this;
    }

    /**
     * Sets up a belongsTo relationship
     * See belongsToRelationship
     */
    belongsTo (relation, foreignKey, foreignKeyName, after) {
        return this.belongsToRelationship('belongsTo', relation, foreignKey, foreignKeyName, after);
    }

    /**
     * Sets up a belongsToMany relationship
     * See belongsToRelationship
     */
    belongsToMany (relation, foreignKey, foreignKeyName, after) {
        return this.belongsToRelationship('belongsToMany', relation, foreignKey, foreignKeyName, after);
    }

    /**
     * Registers a relationship via the boot() method when extending a model
     *
     * @param type The type of relationship
     * @param relation The relation name OR object
     */
    registerBelongsTo (type, relation) {

        let relationRoute = this.getRouteByRelationType(type, relation),
            relationName = this.getRelationshipName(type, relation);

        this.$rels[relationName] = (
            (type, route) => {
                return (primaryKey, foreignKey, after) => { return this.belongsToRelationship(type, route, primaryKey, foreignKey, after); }
            }
        )(type, relationRoute);

        // add to methodRoutes for debugging
        this.methodRoutes.push(relationRoute);

        return this;
    }

    /**
     * Register a "belongsTo" Relationship
     *
     * @param type The type of 'has' Relationship (hasOne, hasMany)
     * @param relation The relation. A string or Rapid model
     * @param foreignKey The foreignKey of the relationship
     * @param foreignKeyName The foreignKeyName of the relationship
     * @param after Anything to append after the relationship
     */
    belongsToRelationship (type, relation, foreignKey, foreignKeyName, after) {
        relation = this.getRouteByRelationType(type, relation);

        let route     = this.currentRoute,
            urlParams = [relation];

        if(foreignKeyName) {
            urlParams.push(foreignKeyName);
        }

        urlParams.push(foreignKey);
        urlParams.push(this.routes[route]);

        if(_isArray(after)) {
            urlParams.push(...after);
        } else {
            urlParams.push(after);
        }

        this.setURLParams(urlParams, false, true);

        return this.any;
    }

    /**
     * Adds a relationship to the model when extending
     *
     * @param type The type of relationship ('hasOne', 'hasMany', 'belongsTo', 'belongsToMany')
     * @param relation The relationship either a Rapid model or string
     */
    addRelationship (type, relation) {
        let hasMethods     = ['hasOne', 'hasMany'],
            belongsMethods = ['belongsTo', 'belongsToMany'];

        if(hasMethods.includes(type)) {
            this.registerHasRelation(type, relation);
        } else if(belongsMethods.includes(type)) {
            this.registerBelongsTo(type, relation);
        }
    }

    /**
     * This gets the route of the relationship if a relationship object
     * is passed rather than a string.
     *
     * @param type The type of relationship ('hasOne', 'hasMany', 'belongsTo', 'belongsToMany')
     * @param relation The relationship either a Rapid model or string
     */
    getRouteByRelationType (type, relation) {
        let relationRoute = relation,
            routes = {
                hasOne        : 'model',
                hasMany       : 'collection',
                belongsTo     : 'model',
                belongsToMany : 'collection'
            };

        if(typeof relation == 'object') {
            relationRoute = relation.routes[routes[type]];

            this.rels[relationRoute] = relation;
        }

        return relationRoute;
    }

    getRelationshipName (type, relation) {
        return _camelCase(this.getRouteByRelationType(type, relation))
    }
}

export default Relationships;
