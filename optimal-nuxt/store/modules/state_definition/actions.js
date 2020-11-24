/**
 *@author uveysservetoglu
 */
import * as types from './mutations-types';
import Proxy from '~/proxies/BaseProxy';
import SmsServiceProxy from '~/proxies/SmsServiceProxy';
import CountryProxy from '~/proxies/CountryProxy';
import CategoryProxy from '~/proxies/CategoryProxy';
import AuthProxy from "~/proxies/AuthProxy";
import SurveyProxy from "~/proxies/SurveyProxy";
import PageProxy from "~/proxies/PageProxy";
import ProfileProxy from "~/proxies/ProfileProxy";


/**
 *Controller
 */
import Privacy from "../../../controller/privacy";
import User from "../../../controller/user";

/**
 *
 * @param commit
 * @param payload
 * @returns {Promise<any>}
 */
export const deleteAccount = ({ commit }, payload) => {

  return new Promise((resolve, reject) =>{
    new ProfileProxy()
      .deleteAccount()
      .then(response =>{
        resolve(response)
      })
      .catch(error =>{
        reject(error)
      });
  });
};

/**
 *
 * @param commit
 * @param payload
 * @returns {Promise<any>}
 */
export const sendVerifySms = ({ commit }, payload) => {
  return new Promise((resolve, reject) =>{
    new SmsServiceProxy()
      .sendSmsVerify(payload)
      .then(response =>{
        resolve(response)
      })
      .catch(error =>{
        reject(error)
      });
  });
};

/**
 *
 * @param commit
 * @param payload
 * @returns {Promise<any>}
 */
export const getAllLangCountries = ({ commit }, payload) => {
  return new Promise((resolve, reject) =>{
    new CountryProxy()
      .langCountries()
      .then(response =>{
        commit(types.SET_DEFINITION, {key: 'countries', data: response.result.set});
        resolve();
      })
      .catch(error =>{
        reject(error)
      });
  });
};

/**
 *
 * @param commit
 * @param payload
 * @returns {*}
 */
export const getAllCategory = ({ commit }, payload) => {

  let filter = payload && payload.filter ? payload.filter : {sort :'id' , order: 'asc', limit:5, offset:0 };
  return new CategoryProxy(filter)
    .getTree()
    .then(response =>{
      commit(types.SET_DEFINITION, {key: 'categories', data: response.result.set});
    });
};

/**
 *
 * @param commit
 * @param payload
 * @returns {Promise<any>}
 */
export const login = ({ commit }, payload) =>{
  return new Promise((resolve, reject) => {
    return new AuthProxy(payload)
      .login(payload)
      .then(response => {
        if (response && !response.code && response.code !== 401) {
          commit(types.SET_DEFINITION, {key: 'token', data: response.token.access_token});
          localStorage.setItem('token',response.token.access_token);
          localStorage.setItem('refreshToken',response.token.refresh_token);
          commit(types.SET_DEFINITION, {key: 'refreshToken', data: response.token.refresh_token});
          resolve(response)
        }else {
          resolve(response)
        }
      });
  });
};

/**
 *
 * @param commit
 * @param payload
 * @returns {Promise<any>}
 */
export const registerUser = ({ commit }, payload) => {

  return new Promise((resolve, reject) =>{
    new AuthProxy()
      .register(payload.register)
      .then(response =>{
        commit(types.SET_DEFINITION, {key: 'token', data: response.access_token});
        localStorage.setItem('token',response.access_token);
        localStorage.setItem('refreshToken',response.refresh_token);
        commit(types.SET_DEFINITION, {key: 'refreshToken', data: response.refresh_token});
        resolve(response)
      })
      .catch(error =>{
        reject(error)
      });
  });
};

/**
 *
 * @param commit
 * @param payload
 * @returns {Promise<any>}
 */
export const checkLogin = ({ commit }, payload) =>{
  return new Promise((resolve, reject) => {
    if(process.client)
      return new AuthProxy(payload)
        .checkLogin()
        .then(response => {
          if(response.result.set.user){
            commit(types.SET_DEFINITION, {key: 'user', data: response.result.set.user});
            commit(types.SET_DEFINITION,{key:'country_code', data:response.result.set.ipService.language_code})
            resolve(response)
          }
          else{
            commit(types.SET_DEFINITION, {key: 'user', data: null});
            commit(types.SET_DEFINITION, {key: 'token', data: null});
            commit(types.SET_DEFINITION, {key: 'refreshToken', data: null});
            localStorage.removeItem('token');
            localStorage.removeItem('refreshToken');
            commit(types.SET_DEFINITION,{key:'country_code', data:response.result.set.ipService.language_code})
            reject(response);
          }
        })
  });
};

/**
 *
 * @param commit
 * @param payload
 * @returns {Promise<any>}
 */
export const userCategory = ({ commit }, payload) => {

  return new Promise((resolve, reject) =>{
    new CategoryProxy()
      .userCategory(payload.data)
      .then(response =>{
        resolve(response)
      })
      .catch(error =>{
        reject(error)
      });
  });
};

/**
 *
 * @param commit
 * @param payload
 * @returns {Promise<any>}
 */
export const getHomeSpecialSurvey = ({ commit }, payload) => {
  return new SurveyProxy()
      .showHomeSurvey()
      .then(response =>{
        commit(types.SET_DEFINITION, {key: 'showHomeSurvey', data: response.result.set});
      })
};

/**
 *
 * @param commit
 * @param payload
 * @returns {Promise<any>}
 */
export const getHomeSurveyApproval = ({ commit }, payload) => {
  return new SurveyProxy()
    .homeSurveyApproval()
    .then(response =>{
      commit(types.SET_DEFINITION, {key: 'homeSurveyApproval', data: response.result.set});
    })
};

/**
 *
 * @param commit
 * @param payload
 * @returns {Promise<any>}
 */
export const getCityList = ({ commit }, payload) => {
  return new Promise((resolve, reject)=>{
    return new CountryProxy()
      .getCityList(payload.country)
      .then(response =>{
        resolve(response.result.set);
      });
  });
};

/**
 *
 * @param commit
 * @param payload
 * @returns {Promise<any>}
 */
export const pushVote = ({ commit }, payload) => {
  return new Promise((resolve, reject) =>{
    new SurveyProxy()
      .pushVote(payload)
      .then(response =>{
        resolve(response)
      })
      .catch(error =>{
        reject(error)
      });
  });
};

/**
 *
 * @param commit
 * @param payload
 * @returns {Promise<any>}
 */
export const savePhoneNumber = ({ commit }, payload) => {
  return new Promise((resolve, reject) =>{
    new AuthProxy()
      .savePhoneNumber(payload)
      .then(response =>{
        resolve(response)
      })
      .catch(error =>{
        reject(error)
      });
  });
};

/**
 *
 * @param commit
 * @param payload
 * @returns {Promise<any>}
 */
export const getProfile = ({ commit }, payload) => {
  return new Promise((resolve, reject)=>{
    return new AuthProxy()
      .getProfile()
      .then(response =>{

        resolve(response.result.set);
      });
  });
};

/**
 *
 * @param commit
 * @param payload
 * @returns {Promise<any>}
 */
export const updateProfile = ({ commit }, payload) => {
  return new Promise((resolve, reject) =>{
    new AuthProxy()
      .updateProfile(payload)
      .then(response =>{
        resolve(response)
      })
      .catch(error =>{
        reject(error)
      });
  });
};

/**
 *
 * @param commit
 * @param payload
 * @returns {Promise<any>}
 */
export const updateProfileImage = ({ commit }, payload) => {
  return new Promise((resolve, reject) =>{
    new AuthProxy()
      .updateProfileImage(payload)
      .then(response =>{
        resolve(response)
      })
      .catch(error =>{
        reject(error)
      });
  });
};

/**
 *
 * @param commit
 * @param payload
 * @returns {Promise<any>}
 */
export const updateNational = ({ commit }, payload) => {
  return new Promise((resolve, reject) =>{
    new AuthProxy()
      .updateNational(payload)
      .then(response =>{
        resolve(response)
      })
      .catch(error =>{
        reject(error)
      });
  });
};

/**
 *
 * @param commit
 * @param payload
 * @returns {Promise<any>}
 */
export const updatePortrait = ({ commit }, payload) => {
  return new Promise((resolve, reject) =>{
    new AuthProxy()
      .updatePortrait(payload)
      .then(response =>{
        resolve(response)
      })
      .catch(error =>{
        reject(error)
      });
  });
};

/**
 *
 * @param commit
 * @param payload
 * @returns {Promise<any>}
 */
export const saveComment = ({ commit }, payload) => {
  return new Promise((resolve, reject) =>{
    new SurveyProxy()
      .saveComment(payload)
      .then(response =>{
        resolve(response)
      })
      .catch(error =>{
        reject(error)
      });
  });
};

/**
 *
 * @param commit
 * @param payload
 * @returns {Promise<any>}
 */
export const editComment = ({ commit }, payload) => {
  return new Promise((resolve, reject) =>{
    new SurveyProxy()
      .editComment(payload)
      .then(response =>{
        resolve(response)
      })
      .catch(error =>{
        reject(error)
      });
  });
};

/**
 *
 * @param commit
 * @param payload
 * @returns {Promise<any>}
 */
export const deleteComment = ({ commit }, payload) => {
  return new Promise((resolve, reject) =>{
    new SurveyProxy()
      .deleteComment(payload)
      .then(response =>{
        resolve(response)
      })
      .catch(error =>{
        reject(error)
      });
  });
};

/**
 *
 * @param commit
 * @param payload
 * @returns {Promise<any>}
 */
export const likeComment = ({ commit }, payload) => {
  return new Promise((resolve, reject) =>{
    new SurveyProxy()
      .likeComment(payload)
      .then(response =>{
        resolve(response)
      })
      .catch(error =>{
        reject(error)
      });
  });
};

/**
 *
 * @param commit
 * @param payload
 * @returns {Promise<any>}
 */
export const saveSurvey = ({ commit }, payload) => {
  return new Promise((resolve, reject) =>{
    new SurveyProxy()
      .createSurvey(payload.survey)
      .then(response =>{
        resolve(response)
      })
      .catch(error =>{
        reject(error)
      });
  });
};

/**
 *
 * @param commit
 * @param payload
 * @returns {Promise<any>}
 */
export const addChoice = ({ commit }, payload) => {
  return new Promise((resolve, reject) =>{
    new SurveyProxy()
      .addChoice(payload)
      .then(response =>{
        resolve(response)
      })
      .catch(error =>{
        reject(error)
      });
  });
};

/**
 *
 * @param commit
 * @param payload
 * @returns {Promise<any>}
 */
export const checkVote = ({ commit }, payload) => {
  return new Promise((resolve, reject) =>{
    new SurveyProxy()
      .checkVote(payload)
      .then(response =>{
        resolve(response)
      })
      .catch(error =>{
        reject(error)
      });
  });
};

/**
 *
 * @param commit
 * @param payload
 * @returns {Promise<any>}
 */
export const cancelVote = ({ commit }, payload) => {
  return new Promise((resolve, reject) =>{
    new SurveyProxy()
      .cancelVote(payload)
      .then(response =>{
        resolve(response)
      })
      .catch(error =>{
        reject(error)
      });
  });
};

/**
 *
 * @param commit
 * @param payload
 * @returns {Promise<any>}
 */
export const submitVote = ({ commit }, payload) => {
  return new Promise((resolve, reject) =>{
    new SurveyProxy()
      .submitVote(payload)
      .then(response =>{
        resolve(response)
      })
      .catch(error =>{
        reject(error)
      });
  });
};

/**
 *
 * @param commit
 * @param payload
 * @returns {Promise<any>}
 */
export const getAllSubjects = ({ commit }, payload) => {
  return new Promise((resolve, reject) =>{
    new SurveyProxy()
      .subjects()
      .then(response =>{
        commit(types.SET_DEFINITION, {key: 'subjects', data: response.result.set});
      })
      .catch(error =>{
        reject(error)
      });
  });
};

/**
 *
 * @param commit
 * @param payload
 * @returns {Promise<any>}
 */
export const hasSurvey = ({commit}, payload) => {
  return new Promise((resolve, reject) =>{
    new SurveyProxy()
      .hasSurvey(payload.id)
      .then(response =>{
        resolve(response.result.set);
      })
      .catch(error =>{
        reject(error)
      });
  });
};

/**
 *
 * @param commit
 * @param payload
 * @returns {Promise<any>}
 */
export const surveyDetail = ({commit}, payload) => {
  return new Promise((resolve, reject) =>{
    new SurveyProxy()
      .detail(payload.id)
      .then(response =>{
        commit(types.SET_DEFINITION, {key: 'survey', data: response.result.set});
        resolve(response.result.set);
      })
      .catch(error =>{
        reject(error)
      });
  });
};

/**
 *
 * @param commit
 * @param payload
 * @returns {Promise<any>}
 */
export const subjectDetail = ({commit}, payload) => {
  return new Promise((resolve, reject) =>{
    new SurveyProxy()
      .subjectDetail(payload.id)
      .then(response =>{
        commit(types.SET_DEFINITION, {key: 'subjectDetail', data: response.result.set});
        resolve(response.result.set);
      })
      .catch(error =>{
        reject(error)
      });
  });
};

/**
 *
 * @param commit
 * @param payload
 * @returns {Promise<any>}
 */
export const newest = ({commit}, payload) => {
  return new Promise((resolve, reject) =>{
    new SurveyProxy()
      .newest()
      .then(response =>{
        commit(types.SET_DEFINITION, {key: 'newest', data: response.result.set});
        resolve(response.result.set);
      })
      .catch(error =>{
        reject(error)
      });
  });
};

/**
 *
 * @param commit
 * @param payload
 * @returns {Promise<any>}
 */
export const topVoted = ({commit}, payload) => {
  return new Promise((resolve, reject) =>{
    new SurveyProxy()
      .newest()
      .then(response =>{
        commit(types.SET_DEFINITION, {key: 'topVoted', data: response.result.set});
        resolve(response.result.set);
      })
      .catch(error =>{
        reject(error)
      });
  });
};

/**
 *
 * @param commit
 * @param payload
 * @returns {Promise<any>}
 */
export const pages = ({commit}, payload) => {
  return new Promise((resolve, reject) =>{
    new PageProxy()
      .all()
      .then(response =>{
        commit(types.SET_DEFINITION, {key: 'pages', data: response.result.set});
        resolve(response.result.set);
      })
      .catch(error =>{
        reject(error)
      });
  });
};

/**
 *
 * @param commit
 * @param payload
 * @returns {Promise<any>}
 */
export const pageDetail = ({commit}, payload) => {
  return new Promise((resolve, reject) =>{
    new PageProxy()
      .detail(payload.id)
      .then(response =>{
        commit(types.SET_DEFINITION, {key: 'pageDetail', data: response.result.set});
        resolve(response.result.set);
      })
      .catch(error =>{
        reject(error)
      });
  });
};

/**
 *
 * @param commit
 * @param payload
 * @returns {Promise<any>}
 */
export const requestFriend = ({commit}, payload) => {
  return new Promise((resolve, reject) =>{
    new ProfileProxy()
      .requestFriend(payload.id)
      .then(response =>{
        resolve(response);
      })
      .catch(error =>{
        reject(error)
      });
  });
};

/**
 *
 * @param commit
 * @param payload
 * @returns {Promise<any>}
 */
export const requestAnswer = ({commit}, payload) => {
  return new Promise((resolve, reject) =>{
    new ProfileProxy()
      .requestAnswer(payload.id, payload.data)
      .then(response =>{
        resolve(response);
      })
      .catch(error =>{
        reject(error)
      });
  });
};

/**
 *
 * @param commit
 * @param payload
 * @returns {Promise<any>}
 */
export const userController = ({commit}, payload) => {
  let UserController = new User();
  return UserController[payload.method]({commit}, payload);
};

/**
 *
 * @param commit
 * @param payload
 * @returns {Promise<any>}
 */
export const privacyController = ({commit}, payload) => {
  let PrivacyController = new Privacy();
  return PrivacyController[payload.method]({commit}, payload);
};
/**
 *
 * @param commit
 * @param dispatch
 * @param payload
 * @returns {Promise<any>}
 */
export const putData = ({commit}, payload) => {
  return new Promise((resolve, reject) =>{
    let proxy = new Proxy(payload && payload.filter ? payload.filter : {});
    proxy.submit('put',`${proxy._baseURL}/${payload.url}`, payload.data)
      .then(response => resolve(response))
      .catch(error => reject(error))
  });
};

/**
 *
 * @param commit
 * @param dispatch
 * @param payload
 * @returns {Promise<any>}
 */
export const postData = ({commit}, payload) => {
  return new Promise((resolve, reject) =>{
    let proxy = new Proxy(payload && payload.filter ? payload.filter : {});
    proxy.submit('post',`/${payload.url}`, payload.data)
      .then(response => resolve(response))
      .catch(error => reject(error))
  });
};

/**
 *
 * @param commit
 * @param dispatch
 * @param payload
 * @returns {Promise<any>}
 */
export const getData = ({commit, dispatch}, payload) => {
  return new Promise((resolve, reject) =>{
    let proxy = new Proxy('',payload && payload.filter ? payload.filter : {});
    proxy.submit('get',`/${payload.url}`)
      .then(response => {
        resolve(response.result.set)
      })
      .catch(error => reject(error))
  });
};

export const setState = ({commit}, payload)=> {
  commit(types.SET_DEFINITION, {key:payload.key, data: payload.data});
}

/**
 * Vuex Actions
 */
export default {
  deleteAccount,
  getAllLangCountries,
  getAllCategory,
  userCategory,
  login,
  registerUser,
  checkLogin,
  getHomeSpecialSurvey,
  getHomeSurveyApproval,
  pushVote,
  getCityList,
  savePhoneNumber,
  getProfile,
  updateProfile,
  updateProfileImage,
  updateNational,
  updatePortrait,
  saveComment,
  editComment,
  deleteComment,
  likeComment,
  saveSurvey,
  addChoice,
  checkVote,
  cancelVote,
  submitVote,
  getAllSubjects,
  hasSurvey,
  surveyDetail,
  subjectDetail,
  newest,
  pages,
  pageDetail,
  requestFriend,
  requestAnswer,

  userController,
  privacyController,

  getData,
  postData,
  putData,
  setState
};
