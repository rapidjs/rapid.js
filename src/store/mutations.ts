export default {
  /**
   * Set the current route.
   * This will set the current route to either model, collection,
   * or any to make appropriate requests
   * Can also be changed by calling rapid.model.func() or rapid.collection.func()
   *
   * @param {Object} state The store state
   * @param {String} route The route to set
   */
  setCurrentRoute(state: Store.State, route: Route) {
    state.currentRoute = route;
  },
};
