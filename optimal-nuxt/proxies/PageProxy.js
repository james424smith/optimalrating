import Proxy from './BaseProxy';

class PageProxy extends Proxy {
  constructor(parameters = {}) {
    super('pages', parameters);
  }

  detail(id){
    return this.submit('get',`/pages/${id}`)
  }
}

export default PageProxy;
