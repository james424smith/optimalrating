import UserProxy from "~/proxies/UserProxy";

class User {
  /**
   *
   * @param commit
   * @param payload
   * @returns {Promise<any>}
   */
  postData({commit}, payload){
    return new Promise((resolve, reject) =>{
      let proxy = new UserProxy();
      proxy.submit('post',`/${payload.url}`, payload.data)
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
  getData({commit}, payload){
    return new Promise((resolve, reject) =>{
      let proxy = new UserProxy();
      proxy.submit('get',`/${payload.url}`)
        .then(response => resolve(response))
        .catch(error => reject(error))
    });
  }
}

export default User
