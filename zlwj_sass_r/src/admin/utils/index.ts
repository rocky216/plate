// import instance, {AxiosRequest} from "./http"
// import {notification } from "antd"
// import {} from "react-router-dom"



// /* 提示 */
// export function OpenNotification(type:string="success", msg:string="操作成功"){
//   (notification as any)[type]({
//     message: msg
//   })
// }

// /**
//  *  url： requuire
//  *  method: get post put delete 默认 get
//  *  data: not require {}
//  */

// export const fetch = (options: AxiosRequest)=>{
  
//   const createInstance = function(){
//     switch( options.method.toUpperCase() ){
//       case "GET":
//         return instance.get( options.url, {params: options.data?options.data:{} })
//       case "POST":
//         return instance.post( options.url, options.data?options.data:{} )
//       case "PUT":
//         return instance.post( options.url, options.data?options.data:{} )
//       case "DELETE":
//         return instance.get( options.url, {params: options.data?options.data:{} })
//     }
//   }

//   return new Promise((resolve, reject)=>{
    
//     createInstance()?.then( response=>{
//       const {data, msg, code } = (response as any);
//       if(code==1){
//         resolve(data);
//       }else if(code==0){
//         reject();
//         OpenNotification("error", msg)
//       }else if(code==-1){
//         reject();
//         OpenNotification("error", msg )
//       }else if(code==2){
//         reject();
//       }
//     }).catch(err=>{
//       console.log(err, 'color: red')
//       reject(err);
//     })
//   });

// }