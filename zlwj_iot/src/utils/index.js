import {notification} from "antd"
import cookies from "react-cookies"
import instance from "./http"
import store from "@/store"
import qs from "qs"

export function Pagination(pageInfo, next){
  if(!pageInfo) return {}
  if(!_.hasIn(pageInfo, "current") || !_.hasIn(pageInfo, "pageSize") || !_.hasIn(pageInfo, "total")){
    OpenNotification("error", "分页少了应有字段！")
    return {}
  }
  const {current, pageSize, total} = pageInfo
  return {
    current,
    pageSize,
    total,
    onChange: function(){
      if(next)next(...arguments) 
    }
  }
} 

export function addIndex(arr){
  if(!_.isArray(arr)) return []
  _.each(arr, (item, index)=>{
    item.key = index+1
  })
  return arr
}

export function getToken(){
  if(store.getState().app.token){
    return store.getState().app.token
  }else {
    if(getCookie("token")){
      return getCookie("token")
    }else{
      return ''
    }
  }
}


export function setCookie(key, val){
  if(typeof val != 'string' && typeof val != 'number' && typeof val != 'null'){
    val = JSON.stringify(val)
  }
  let expires = new Date()
  expires.setDate(Date.now() + 1000 * 60 * 60 * 24 * 14)
  cookies.save(key,val, {
    path: "/",
    maxAge: 60*60*2,
    // expires
  })
}

export function getCookie(key){
  let data = cookies.load(key)
  return data
}

export function removeCookie(key){
  cookies.remove(key, { path: '/' })
}

export function OpenNotification(type, messgae, desc){
  notification.open({
    type,
    message: messgae?messgae: type=='success'?"操作成功！": "操作失败！",
    description: desc?desc:'',
    duration: 3
  })
}

export async function fetch(opt){
  let token = await getToken("token")
  console.log(token, "token")
  opt.data?opt.data.token = token:opt.data={token: token}
  let hash = new Date().getTime()

  function handlenInstance(){
    switch(opt.method.toLowerCase()){
      case "delete":
        return instance.delete(opt.url, {params: {...opt.data,hash}})
      case "post":
        return instance.post(opt.url, qs.stringify({...opt.data, hash}))
      case "formdata":
        return instance.post(opt.url, {...opt.data,hash})
      case "put":
        return instance.put(opt.url, qs.stringify({...opt.data, hash}))
      default:
        return instance.get(opt.url, {params: {...opt.data,hash}})
    }
  }

  return new Promise((resolve, reject)=>{
    handlenInstance().then(response=>{
      const {code, data, msg} = response
      if(response.code == 1){
        resolve(data)
      }else if(code == -1){
        _navigation.push("/login")
        reject()
      }else{
        OpenNotification("error", msg)
        reject()
      }
    })
    .catch(err=>{
      console.log(err)
      reject(err)
    })
  })
}