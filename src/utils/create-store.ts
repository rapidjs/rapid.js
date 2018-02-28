export const createStore = (store: Store) => {
  const { state } = store;

  const commit = (mutation: string, ...params) => {
    return store.mutations[mutation].call(null, state, ...params);
  };

  const getFrozenState = () => {
    const stateObject = (<any>Object).assign({}, state);

    return Object.freeze(stateObject);
  };

  return Object.defineProperties(
    {},
    {
      state: {
        get() {
          return getFrozenState();
        },
      },
      commit: {
        value: commit,
      },
    },
  );
};
