import {COMPANY_LOADING_START, COMPANY_LOADING_END, COMPANY_LOADING_NOT} from "@admin/constant/company"
import {fetch} from "@public/utils"
import MC from "memory-cache"
import _ from "lodash"

/**
 * list API公共方法
 * 
 */
interface OptionListProps{
  options: any;
  dispatch:any;
  keyName: string;
  obj?:any;
  next?:(...arg0:any)=>void;
  type?:string;  //"add" | "edit"
  refresh?: boolean
}

interface ParamsListProps{
  params: any;
  obj?:any;
  next?:(...arg0:any)=>void;
  type?:string;  //"add" | "edit"
  refresh?: boolean
}
// options:any,keyName:string, obj?:any, next?:(...arg0:any)=>void
const optionList = async (opt: OptionListProps)=>{
    const {options,dispatch, keyName, obj, next, type, refresh} = opt;
    try{
      let key = options.url+JSON.stringify(options.data)
      let isCache = MC.get(key)
      
    if(!isCache || refresh){
      dispatch({
        type: COMPANY_LOADING_START
      })
      let data:any = await fetch(options)
      if(next)next(data)
      MC.put(key, data)
      dispatch({
        type: COMPANY_LOADING_END,
        [keyName]: data
      })
    }else{
      if(obj && _.size(obj)){
        let index = _.findIndex(isCache.list, (o:any)=>o.id==obj.id)
        if(type=="edit"){
          isCache.list[index] = _.assign(isCache.list[index], obj);
        }else if(type=="add"){
          isCache.list[index] = _.assign(isCache.list[index], obj);
        }

        MC.put(key, isCache)
        dispatch({
          type: COMPANY_LOADING_NOT,
          [keyName]: isCache
        })
      }else{
        dispatch({
          type: COMPANY_LOADING_END,
          [keyName]: isCache
        })
      }
      
    }
    
  }catch(e){
    console.log(e)
    dispatch({type: COMPANY_LOADING_END})
  }
  
}

export const updateCompanyStatus = (params:any, next:Function)=>{
  return async (dispatch:Function, getState:any)=>{
    dispatch({
      type: COMPANY_LOADING_START,
    })
    try{
      const options:any = {
        url: "/zlwj/api/system/sys/sys-company/updateStatus",
        method: "post",
        data: params
      }
      let data:any = await fetch(options)
      if(next)next(data)
      dispatch({
        type: COMPANY_LOADING_END,
      })
      
    }catch(e){
      console.log(e)
      dispatch({type: COMPANY_LOADING_END})
    }
  }
}

export const addCompany = (params:any, next:Function)=>{
  return async (dispatch:Function, getState:any)=>{
    dispatch({
      type: COMPANY_LOADING_START,
    })
    try{
      const options:any = {
        url: "/zlwj/api/system/sys/sys-company/save",
        method: "post",
        data: params
      }
      let data:any = await fetch(options)
      if(next)next(data)
      dispatch({
        type: COMPANY_LOADING_END,
      })
      
    }catch(e){
      console.log(e)
      dispatch({type: COMPANY_LOADING_END})
    }
  }
}

export const getCompanys = (opt:ParamsListProps)=>{
  return async (dispatch:Function, getState:any)=>{
    const {params, obj, next, type, refresh=false} = opt
    const options:any = {
      url: "/zlwj/api/system/sys/sys-company/page",
      method: "get",
      data: params
    }
    optionList({options: options,dispatch,keyName: "companys", obj: obj, next:next, refresh:refresh, type:type})
    
    // try{
    //   const options:any = {
    //     url: "/zlwj/api/system/sys/sys-company/page",
    //     method: "get",
    //     data: params
    //   }
    //   let key = options.url+JSON.stringify(options.data)
    //   let isCache = MC.get(key)
      
    //   if(!isCache){
    //     dispatch({
    //       type: COMPANY_LOADING_START
    //     })
    //     let data:any = await fetch(options)
    //     MC.put(key, data)
    //     dispatch({
    //       type: COMPANY_LOADING_END,
    //       companys: data
    //     })
    //   }else{
    //     if(obj){
    //       let index = _.findIndex(isCache.list, (o:any)=>o.id==obj.id)
    //       isCache.list[index] = _.assign(isCache.list[index], obj);
    //       MC.put(key, isCache)
    //       dispatch({
    //         type: COMPANY_LOADING_NOT,
    //         companys: isCache
    //       })
    //     }else{
    //       dispatch({
    //         type: COMPANY_LOADING_END,
    //         companys: isCache
    //       })
    //     }
        
    //   }
      
    // }catch(e){
    //   console.log(e)
    //   dispatch({type: COMPANY_LOADING_END})
    // }
  }
}
