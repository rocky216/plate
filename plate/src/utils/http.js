import axios from "axios"
import store from "@/store"

let instance = axios.create({
  // baseURL: '/',
  timeout: 10000,
  withCredentials: true,
})


instance.interceptors.request.use(config=> {
  console.log(store.getState().token, "config")
  return config;
}, error=> {
  return Promise.reject(error); 
});

instance.interceptors.response.use(response=>{
  return response.data;
}, error=>{
  return Promise.reject(error);
});

export default instance
