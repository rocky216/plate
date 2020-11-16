import instance, {AxiosRequest} from "./http"
import {notification } from "antd"
import {useLocation} from "react-router-dom"
import qs from "qs"
import {save, remove, load} from "react-cookies"


/* 移出token */
export const removeToken = ()=>{
  remove("token", {path: "/"})
}
/* 存储token */
export const saveToken = (token:string)=>{
  save("token", token, {path: "/"})
}

/* 获取token */
export const getToken = ()=>{
  return load("token")
}


/* 提示 */
export function OpenNotification(type:string="success", msg:string="操作成功"){
  (notification as any)[type]({
    message: msg
  })
}

/**
 *  url： requuire
 *  method: get post put delete 默认 get
 *  data: not require {}
 */

export const fetch = (options: AxiosRequest)=>{
  options.data = {...options.data, token: getToken()}
  const createInstance = function(){
    switch( options.method.toUpperCase() ){
      case "GET":
        return instance.get( options.url, {params: options.data?options.data:{} })
      case "POST":
        return instance.post( options.url, options.data? qs.stringify(options.data) :{} )
      case "PUT":
        return instance.post( options.url, options.data?qs.stringify(options.data):{} )
      case "DELETE":
        return instance.get( options.url, {params: options.data?options.data:{} })
    }
  }

  

  return new Promise((resolve, reject)=>{
    
    createInstance()?.then( response=>{
      const {data, msg, code } = response.data;
      console.log(response)
      if(code==1){
        resolve( data );
      }else if(code==0){
        OpenNotification("error", msg)
        reject();
      }else if(code==-1){
        (window as any)._navigation.push("/login")
        reject();
        OpenNotification("error", msg )
      }else if(code==2){
        reject();
      }
    }).catch(err=>{
      console.log(err, 'color: red')
      reject(err);
    })
  });

}