import axios from "axios"
import qs from "qs"
import {getToken} from "./index"

const instance = axios.create({
  baseURL: "",
  data: {
    token: "token"
  }
})

instance.interceptors.request.use( async function(config){
  let token = await getToken();
  let opt = {
    ...config.data,
    token: token
  }
  if(config.method == "get"){
    config.params = {...config.params, token}
  }else if(config.method == "post"){
    config.data = qs.stringify(opt)
  }

  
  return config;
}, function(){
  
})

instance.interceptors.response.use(function(response){
  
  return response.data;
}, function(){
  
  return Promise.reject();
})

export default instance;
