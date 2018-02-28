import { createStore } from '../utils/create-store';
import mutations from './mutations';
import state from './state';

const store = createStore({
  mutations,
  state,
});

export default store;
