import Proxy from './BaseProxy';

class CountryProxy extends Proxy {
  constructor(parameters = {}) {
    super('countries', parameters);
  }
  langCountries(){
    return this.submit('get', `/languages`);
  }
  getCityList(item){
    return this.submit('get', `/citiesOfCountry/${item}`);
  }
}

export default CountryProxy;
