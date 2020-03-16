import axios from "axios"
import {getToken, OpenNotification} from "@/utils"

const filterUrl = [
  "/iot/pc/verifyCodeImg",
  "/iot/pc/login"
]

const instance = axios.create({
  baseURL: "",
})

instance.interceptors.request.use(function(config){
  let index = filterUrl.indexOf(config.url)
  if(index>-1){
    return config
  }
  if(getToken("token") && getToken("token").length>10){
    return config
  }else{
    // OpenNotification("error", "token格式不正确！")
    _navigation.push("/login")
    return false
  }
  
}, function(error){
  return Promise.reject(error)
})

instance.interceptors.response.use(function(response){
  return response.data
}, function(error){
  return Promise.reject(error)
})

export default instance