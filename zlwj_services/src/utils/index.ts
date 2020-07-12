import qs from "qs"
import instance from "./http"
import {RequestOption } from "@/interface/utils"
import {notification } from "antd"
import {save, load, remove } from "react-cookies"
import _ from "lodash"

/* 分页 */
export function Pagination(pageInfo:any, next:(...arg0:any)=>void){
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
    onChange: function(page: number, pageSize: number){
      if(next)next(page, pageSize);
    }
  }
} 

export function normFileMulti(e:any){ 
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

export function submitFiles(arr:any[]){
  if(!_.isArray(arr)) return "";
  
  let newArr:string[] = []
  _.each(arr, (item:any)=>{
    newArr.push(item.url)
  })
  return newArr.join();
}



export function normFileSingle(e:any){
  if (Array.isArray(e)) {
    return e;
  }
  if(e.file.status == "done"){
    return [{url: e.file.response.data, uid: e.file.uid, name:  e.file.name}];
  }else{
    return e && e.fileList 
  }
}


/* 添加KEY 
*   若存在tree结构要以ID为key否则以index为
*/
export function addIndex(arr:Array<any>, type:boolean=false) {
  const handleArr = (obj:any[])=>{
    _.each(obj, (item,index)=>{
      item.key = !type?(index+1)+_.random(0,10)/100:item.id
      if(item.children && item.children.length){
        handleArr(item.children)
      }
    })
  }
  handleArr(arr)
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