import Proxy from './BaseProxy';
import axios from 'axios';
class AuthProxy extends Proxy {
  constructor(parameters = {}) {
    super('', parameters);
  }

  requestFriend(id) {
    return this.submit('get', `/friend/requestFriend/${id}`);
  }

  requestAnswer(id, data) {
    return this.submit('patch', `/friend/requestAnswer/${id}`, data);
  }

  getPrivacy() {
    return this.submit('get', `/userPrivacySetting`);
  }

  deleteAccount() {
    return this.submit('get', `/delete-my-account`);
  }
}

export default AuthProxy;
