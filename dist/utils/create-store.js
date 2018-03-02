"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createStore = void 0;

var createStore = function createStore(store) {
  var state = store.state;

  var commit = function commit(mutation, param) {
    return store.mutations[mutation].call(null, state, param);
  };

  var getFrozenState = function getFrozenState() {
    var stateObject = Object.assign({}, state);
    return Object.freeze(stateObject);
  };

  return Object.defineProperties({}, {
    state: {
      get: function get() {
        return getFrozenState();
      }
    },
    commit: {
      value: commit
    }
  });
};

exports.createStore = createStore;