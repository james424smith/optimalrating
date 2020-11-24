import store from '~/store';

export const PrivacyChange = (privacy, option) =>{
  store.dispatch('state_definition/privacyController', {method:'privacySettings', privacy, option})
    .then(response =>{
      console.log(response)
    })
};

