import { createStore } from 'picostore';
import state from './state';

const store = createStore({
  state,
});

export default store;
