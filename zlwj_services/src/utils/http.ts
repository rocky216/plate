import axios from "axios"


const instance = axios.create({
  baseURL: "",
  data: {
    token: "token"
  }
})

instance.interceptors.request.use(function(config){
  
  return config;
}, function(){
  
})

instance.interceptors.response.use(function(response){
  
  return response.data;
}, function(){
  
  return Promise.reject();
})

export default instance;
