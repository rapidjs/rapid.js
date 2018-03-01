declare namespace Store {
  interface StoreData {
    mutations: object;
    state: Store.State;
  }
  interface State {
    currentRoute: Route;
  }

  interface Store {
    state: object;
    commit: Function;
  }
}

declare interface Config {
  customRoutes: any[];
  defaultRoute: string;
  routes: {
    any?: string;
    model?: string;
    collection?: string;
  };
}

declare interface RequestData {
  params: object;
  options: object;
}

declare enum Route {
  ANY = 'any',
  MODEL = 'model',
  COLLECTION = 'collection',
}
