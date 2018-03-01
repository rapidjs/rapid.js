export const createStore = (store: Store.StoreData): Store.Store => {
  const { state } = store;

  const commit = (mutation: string, param: any) => store.mutations[mutation].call(null, state, param);

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
