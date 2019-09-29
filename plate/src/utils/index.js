import { notification } from 'antd';
import qs from "qs"
import instance from "./http"


export function getUserInfo(attr){
  const key = attr?attr:"id"
  let userInfo = localStorage.getItem("userInfo")
  return userInfo!='undefined' && userInfo!=''?JSON.parse(userInfo)[key]:''
}

export function getHouseInfo(attr){
  const key = attr?attr:"id"
  let houseInfo = localStorage.getItem("houseInfo")
  return houseInfo!='undefined' && houseInfo!=''?JSON.parse(houseInfo)[key]:''
}

export function addIndex(arr){
  if(!_.isArray(arr)) return []
  _.each(arr, (item, index)=>{
    item["key"] = index+1
  })
  return arr
}

export function OpenNotification(type, messgae, desc){
  console.log(messgae?messgae: type=='success'?"操作成功！": "操作失败！", "fgdfg")
  notification.open({
    type,
    message: messgae?messgae: type=='success'?"操作成功！": "操作失败！",
    description: desc?desc:'',
    duration: 3
  })
}

export function fetch(opt){
  let newUrl = `/system${opt.url}?token=${localStorage.getItem("token")?localStorage.getItem("token"):''}`
  function handlenInstance(){
    switch(opt.method.toLowerCase()){
      case "get":
        return instance.get(newUrl, {params: opt.data})
      case "delete":
        return instance.delete(newUrl, {params: opt.data})
      case "post":
        return instance.post(newUrl, qs.stringify(opt.data))
      case "formdata":
        return instance.post(newUrl, opt.data)
      case "put":
        return instance.put(newUrl, qs.stringify(opt.data))
    }
  }

  return new Promise((resolve, reject)=>{
    handlenInstance().then(response=>{
      if(response.code == 1){
        resolve(response.data)
      }else if(response.code == -1){
        _navigation.push("/login")
        OpenNotification("error", response.msg)
        reject()
      }else{
        OpenNotification("error", response.msg)
        reject()
      }
    })
    .catch(err=>{
      console.log(err)
      reject()
    })
  })
  

  

}