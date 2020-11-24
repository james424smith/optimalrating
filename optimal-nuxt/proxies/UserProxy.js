import Proxy from './BaseProxy';


class SurveyProxy extends Proxy {
  constructor(parameters = {}) {
    super('user', parameters);
  }
}

export default SurveyProxy;
