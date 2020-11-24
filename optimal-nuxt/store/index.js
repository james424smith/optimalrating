import Vue from 'vue';
import Vuex from 'vuex';
import state_definition from './modules/state_definition'
import createLogger from 'vuex/dist/logger'

Vue.use(Vuex);

const debug = process.env.MODE_ENV !== 'production';

/**
 * Vuex Store
 */
const createStore = () =>{

  return new Vuex.Store({
    modules:{
      state_definition
    },
    strict : debug,
    plugins: debug ? [createLogger()] : []
  });
};

export default createStore;