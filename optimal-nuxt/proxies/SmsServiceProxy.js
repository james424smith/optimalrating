import BaseProxy from './BaseProxy';

class SmsServiceProxy extends BaseProxy{

  constructor(parameters = {} ){
    super('send-sms', parameters)
  }

  sendSmsVerify(data){
    return this.submit('post', '/send-sms-verify', data)
  }

}

export default SmsServiceProxy;