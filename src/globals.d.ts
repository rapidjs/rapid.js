declare namespace Store {
  interface Store {
    mutations: object;
    state: object;
  }
  interface State {
    currentRoute: string;
  }
}
