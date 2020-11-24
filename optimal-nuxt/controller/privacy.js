import ProfileProxy from "~/proxies/ProfileProxy";

class Privacy {
  /**
   *
   * @param commit
   * @param payload
   * @returns {Promise<any>}
   */
  privacySettingsChange({commit}, payload){
    return new Promise((resolve, reject) =>{
      let proxy = new ProfileProxy();
      proxy.submit('post',`/userPrivacySettings`, payload.data)
        .then(response => resolve(response))
        .catch(error => reject(error))
    });
  }

  /**
   *
   * @param commit
   * @param payload
   * @returns {Promise<any>}
   */
  getPrivacy({commit}, payload){
    return new Promise((resolve, reject) =>{
      new ProfileProxy()
      let proxy = new ProfileProxy();
      proxy.submit('get',`/userPrivacySettings`)
        .then(response => resolve(response))
        .catch(error => reject(error))
    });
  };
}

export default Privacy
