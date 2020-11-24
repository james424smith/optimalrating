import axios from 'axios'

class BaseProxy {

  BaseUrl = process.env.base_url;
  ApiUrl  = process.env.api_url;
  CdnUrl  = process.env.cdn_url;

  constructor(endpoints, parameters = {})
  {
    this.endpoint = endpoints;
    this.paremeters = parameters;

    if(process.client){
      this.headers = {}
    }
  }

  getParameterString()
  {
    let queryString = Object.keys(this.paremeters).map((key)=>{
      return key = '='+ this.paremeters[key]
    }).join('&');

    return queryString.length === 0 ? '' : `?${queryString}`;
  }

  submit(requestType, url, data = null){
    return new Promise((resolve, reject)=>{
      let apiUrl = this.ApiUrl + url+this.getParameterString();
      let headers = null;
      if (process.client) {
        headers = {
          'Authorization': 'Bearer ' + localStorage.getItem('token'),
        };
        if (localStorage.getItem('country') !== null && localStorage.getItem('country') !== undefined){
          headers.country = localStorage.getItem('country');
        }
      }
      if (requestType === 'post'){
        axios.post(apiUrl,data,{headers})
          .then(response => {resolve(response.data);})
          .catch(error=>{reject(error)});
      }else if (requestType === 'put'){
        axios.put(apiUrl, data, {headers},)
          .then(response => {resolve(response.data);})
          .catch(error=>{reject(error)});
      }else if (requestType === 'patch'){
        axios.patch(apiUrl, data, {headers},)
          .then(response => {resolve(response.data);})
          .catch(error=>{reject(error)});
      }else if (requestType === 'delete') {
        axios.delete(apiUrl,{headers})
          .then(response => {resolve(response.data);})
          .catch(error=>{reject(error)});
      }else{
        axios.get(apiUrl,{headers})
          .then(response => {resolve(response.data);})
          .catch(error=>{reject(error)});
      }
    })
  }

  all()
  {
    return this.submit('get', `/${this.endpoint}`)
  }

}

export default BaseProxy
