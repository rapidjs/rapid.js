export const createStore = (store: Store.Store): object => {
  const { state } = store;

  const commit = (mutation: string, ...params) => {
    return store.mutations[mutation].call(null, state, ...params);
  };

  const getFrozenState = (): object => {
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
