import Proxy from './BaseProxy';

class CategoryProxy extends Proxy {
  constructor(parameters = {}) {
    super('categories', parameters);
  }

  getTree(){
    return this.submit('get',`/categories/tree`);
  }

  userCategory(data){
    return this.submit('post',`/userCategoryCreate`, data)
  }

}

export default CategoryProxy;
