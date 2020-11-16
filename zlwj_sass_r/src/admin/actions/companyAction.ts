import {COMPANY_LOADING_START, COMPANY_LOADING_END} from "@admin/constant/company"
import {fetch} from "@public/utils"
import MC from "memory-cache"

export const getCompanys = (params:any, next:Function)=>{
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
          type: COMPANY_LOADING_START
        })
        let data:any = await fetch(options)
        MC.put(key, data)
        dispatch({
          type: COMPANY_LOADING_END,
          companys: data
        })
      }
      
    }catch(e){
      console.log(e)
      dispatch({type: COMPANY_LOADING_END})
    }
  }
}
