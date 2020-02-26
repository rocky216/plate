import axios from "axios"
import {getToken, OpenNotification, getCookie} from "@/utils"

const filterUrl = [
  "/api/pc/verifyCodeImg",
  "/api/pc/login"
]

const instance = axios.create({
  baseURL: "",
  timeout: 60000
})

instance.interceptors.request.use( async function(config){
  let index = filterUrl.indexOf(config.url)
  if(index>-1){
    return config
  }
  let token = await getCookie("token")
  if(token && token.length>10){
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