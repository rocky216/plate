import cookies, { __esModule } from "react-cookies"
import qs from "qs"
import instance from "./http"
import { notification } from 'antd';
import store from "@/store"

export function normFileMulti(e){
  if (Array.isArray(e)) {
    return e;
  }
  if(e.file.status == "done"){
    e.fileList.push({url: e.file.response.data, uid: e.file.uid, name:  e.file.name})
    return _.filter(e.fileList, o=>!o.response);
  }else{
    return e && e.fileList
  }
}

export function submitFiles(arr){
  if(!_.isArray(arr)) return "";
  
  let newArr = []
  _.each(arr, item=>{
    newArr.push(item.url)
  })
  return newArr.join();
}



export function normFileSingle(e){
  if (Array.isArray(e)) {
    return e;
  }
  if(e.file.status == "done"){
    return [{url: e.file.response.data, uid: e.file.uid, name:  e.file.name}];
  }else{
    return e && e.fileList
  }
}

export function isNumber(val){
  var regPos = /^\d+(\.\d+)?$/; //非负浮点数
  var regNeg = /^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/; //负浮点数
  if(regPos.test(val) || regNeg.test(val)) {
    return true;
  } else {
    return false;
  }

}

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

export function fetch(opt){
  opt.data?opt.data.token = getToken():opt.data={token: getToken()} 

  function handlenInstance(){
    switch(opt.method.toLowerCase()){
      case "delete":
        return instance.delete(opt.url, {params: opt.data})
      case "post":
        return instance.post(opt.url, qs.stringify(opt.data))
      case "formdata":
        return instance.post(opt.url, opt.data)
      case "put":
        return instance.put(opt.url, qs.stringify(opt.data))
      default:
        return instance.get(opt.url, {params: opt.data})
    }
  }

  return new Promise((resolve, reject)=>{
    handlenInstance().then(response=>{
      const {code, data, msg} = response
      if(response.code == 0){
        resolve(data)
      }else if(code == 2){
        _navigation.push("/login")
        reject()
      }else if(code == -1){
        OpenNotification("error", "操作异常")
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
