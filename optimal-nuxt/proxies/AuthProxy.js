import Proxy from './BaseProxy';
import axios from 'axios';
class AuthProxy extends Proxy {
  constructor(parameters = {}) {
    super('', parameters);
  }

  register(register) {
    return this.submit('post', '/register', register);
  }

  login(payload) {
    if (payload && payload.social){
      return this.submit('post', '/login/'+payload.social, {token:payload.token});
    }
    const data = {
      email: payload.email,
      password: payload.password,
    };

    return this.submit('post', '/login', data);
  }

  checkLogin() {
    const headers = {
      'Authorization': 'Bearer '+localStorage.getItem('token'),
    };

    return new Promise((resolve, reject)=>{
      axios.get(this.ApiUrl+'/init', {headers})
        .then(response => {
            localStorage.setItem('country', response.data.result.set.ipService.language_code)
            resolve(response.data);
          }
        )
        .catch(
          error=>{
            reject(error)
          }
        );
    })
  }

  savePhoneNumber(data){
    return this.submit('post',`/savePhoneNumber`, data);
  }

  updateProfile(data){
    return this.submit('put',`/profile`, data);
  }

  updateProfileImage(data){
    return this.submit('patch',`/profileImage`, {image:data.image});
  }

  updateNational(data){
    return this.submit('patch',`/nationalImage`, {image:data.image});
  }

  updatePortrait(data){
    return this.submit('patch',`/portraitImage`, {image:data.image});
  }

  getProfile(){
    return this.submit('get',`/profile`);
  }
}

export default AuthProxy;
