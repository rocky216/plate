import {APP_LOADING_START, APP_LOADING_END, APP_LOADING_NOT} from "@admin/constant/app"
import {fetch} from "@public/utils"
import MC from "memory-cache"


export const getCompanys = (params:any, next?:Function)=>{
  return async (dispatch:Function, getState:any)=>{
    try{
      const options:any = {
        url: "/zlwj/api/system/sys/sys-company/page",
        method: "get",
        data: params
      }
      let key = options.url+JSON.stringify(options.data)
      let isCache = MC.get(key)
      
      if(!isCache){
        dispatch({
          type: APP_LOADING_START
        })
        let data:any = await fetch(options)
        MC.put(key, data) 
        dispatch({
          type: APP_LOADING_END,
          companys: data
        })
      }else{
        dispatch({
          type: APP_LOADING_NOT,
          companys: isCache
        })
      }
      
    }catch(e){
      console.log(e)
      dispatch({type: APP_LOADING_END})
    }
  }
}


export const getRegions = (params:any, next:Function)=>{
  return async (dispatch:Function, getState:any)=>{
    try{
      const options:any = {
        url: "/zlwj/api/system/area/cityArea",
        method: "get",
        data: params
      }
      let key = options.url+JSON.stringify(options.data)
      let isCache = MC.get(key)
      
      if(!isCache){ 
        dispatch({
          type: APP_LOADING_START
        })
        let data:any = await fetch(options)
        MC.put(key, data)
        dispatch({
          type: APP_LOADING_END,
          region: data
        })
      }
      
    }catch(e){
      console.log(e)
      dispatch({type: APP_LOADING_END})
    }
  }
}
