/**
 * @author uveysservetoglu
 */


import {
  SET_DEFINITION,
  SET_DEFINITION_ITEM,
  ADD_DEFINITION_ITEM,
  ADD_DEFINITION_ITEM_AFTER,
  EMPTY_DEFINITION,
  DELETE_DEFINITION
} from  './mutations-types';

export default {

  /**
   *
   * @param state
   * @param payload
   */
  [SET_DEFINITION](state, payload){
    state[payload.key] = payload.data
  },

  /**
   *
   * @param state
   * @param payload
   */
  [SET_DEFINITION_ITEM](state, payload){

    let item  = state[payload.key].find(item => item.id == payload.data.id),
        index = state[payload.key].indexOf(item);
    state[payload.key].splice(index, 1, 0, ...payload.data);

  },

  /**
   *
   * @param state
   * @param payload
   */
  [ADD_DEFINITION_ITEM](state, payload){

    state[payload.key].push(payload.data)

  },

  /**
   *
   * @param state
   * @param payload
   */
  [ADD_DEFINITION_ITEM_AFTER](state, payload){

    state[payload.key].splice(this.index, 1, 0, ...payload.data);

  },

  /**
   * @param state
   * @param payload
   */
  [DELETE_DEFINITION](state, payload){

    let index = state[payload.key].indexOf(item);

    state[payload.key].splice(index,1);

  },

  /**
   *
   * @param state
   * @param payload
   */
  [EMPTY_DEFINITION](state, payload){

    state[payload.key] = [];

  }
}

/* fresh **/