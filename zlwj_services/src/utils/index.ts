import qs from "qs"
import instance from "./http"
import {RequestOption } from "@/interface/utils"
import {notification } from "antd"
import {save, load, remove } from "react-cookies"
import _ from "lodash"


/* 添加KEY */
export function addIndex(arr:Array<any>) {
  _.each(arr, (item,index)=>{
    item.key = index+1
  })
  return arr;
}

/* 获取token */
export function getToken():string{
  return load("token")
}

/* 设置token */
export function setToken(str:string):void{
  save("token", str, {
    path: "/"
  })
}

/* 删除token */
export function removeToken():void{
  remove("token", {
    path: "/"
  })
}


/* 提示 */
export function OpenNotification(type:string="success", msg:string="操作成功"){
  (notification as any)[type]({
    message: msg
  })
}

/* 请求方法 */

export function fetch(options: RequestOption){

  const createInstance = function(){
    switch( options.method.toUpperCase() ){
      case "GET":
        return instance.get( options.url, {params: options.data?options.data:{} })
      case "POST":
        return instance.post( options.url, options.data?options.data:{} )
    }
  }

  return new Promise((resolve, reject)=>{
    
    createInstance()?.then( response=>{
      const {data, msg, code } = (response as any);
      if(code==1){
        resolve(data);
      }else if(code==0){
        reject();
        OpenNotification("error", msg)
      }else if(code==-1){
        reject();
        OpenNotification("error", msg )
      }else if(code==2){
        (window as any)._navigation.push("/login")
        reject();
      }

      
    }).catch(err=>{
      console.log(err, 'color: red')
      reject(err);
    })
  });

}