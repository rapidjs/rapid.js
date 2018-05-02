import Request from './request';
class Crud extends Request {
    find(id) {
        return this.model.id(id).get();
    }
    updateOrDestroy(method, ...params) {
        const urlParams = [];
        const id = params[0];
        let data = params[1];
        if (Number.isInteger(id)) {
            this.id(id);
        }
        else {
            [data] = params;
        }
        if (Object.prototype.hasOwnProperty.call(this.config.suffixes, method)) {
            urlParams.push(this.config.suffixes[method]);
        }
        if (method === 'update') {
            this.withParams(data);
        }
        return this.model.buildRequest(this.config.methods[method], urlParams);
    }
    update(...params) {
        return this.updateOrDestroy('update', ...params);
    }
    save(...params) {
        return this.update(...params);
    }
    destroy(...params) {
        return this.updateOrDestroy('destroy', ...params);
    }
    restore(id) {
        const urlParams = [];
        if (Number.isInteger(id)) {
            this.id(id);
        }
        if (Object.prototype.hasOwnProperty.call(this.config.suffixes, 'restore')) {
            urlParams.push(this.config.suffixes.restore);
        }
        return this.model.buildRequest(this.config.methods.restore, urlParams);
    }
    create(data) {
        return this.withParams(data)
            .buildRequest(this.config.methods.create, this.config.suffixes.create);
    }
    id(id) {
        let params = [];
        if (this.config.primaryKey) {
            params = [this.config.primaryKey, id];
        }
        else {
            params = [id];
        }
        this.prepend(params);
        return this;
    }
    all() {
        return this.collection.get();
    }
    findBy(key, value) {
        const urlParams = [key];
        if (value) {
            urlParams.push(value);
        }
        return this.get(...urlParams);
    }
}
export default Crud;
