import {START_LOADING_COMPANY, END_LOADING_COMPANY } from "@/types"
import {log_color} from "@/utils/config"
import {fetch} from "@/utils"

export function editCompanyCallbackUrl(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_COMPANY,
    })
    try{
      const options = {
        url: "/iot/pc/callback/update/"+params.id,
        method: "post",
        data: {
          ...params
        }
      }

      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_COMPANY,
      })
    }catch(err){
      console.log(err, `color: ${log_color}`)
      dispatch({
        type: END_LOADING_COMPANY,
      })
    }

  }
}

export function addCompanyCallbackUrl(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_COMPANY,
    })
    try{
      const options = {
        url: "/iot/pc/callback/",
        method: "post",
        data: {
          ...params
        }
      }

      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_COMPANY,
      })
    }catch(err){
      console.log(err, `color: ${log_color}`)
      dispatch({
        type: END_LOADING_COMPANY,
      })
    }

  }
}

export function getCompanyCallbackUrl(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_COMPANY,
    })
    try{
      const options = {
        url: "/iot/pc/callback/index/page",
        method: "get",
        data: {
          ...params
        }
      }

      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_COMPANY,
        callbackurl: data
      })
    }catch(err){
      console.log(err, `color: ${log_color}`)
      dispatch({
        type: END_LOADING_COMPANY,
      })
    }

  }
}

export function editCompanyDevice(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_COMPANY,
    })
    try{
      const options = {
        url: "/iot/pc/device/update/"+params.id,
        method: "post",
        data: {
          ...params
        }
      }

      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_COMPANY,
      })
    }catch(err){
      console.log(err, `color: ${log_color}`)
      dispatch({
        type: END_LOADING_COMPANY,
      })
    }

  }
}

export function addCompanyDevice(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_COMPANY,
    })
    try{
      const options = {
        url: "/iot/pc/device/",
        method: "post",
        data: {
          ...params
        }
      }

      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_COMPANY,
      })
    }catch(err){
      console.log(err, `color: ${log_color}`)
      dispatch({
        type: END_LOADING_COMPANY,
      })
    }

  }
}

export function getCompanyDevice(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_COMPANY,
    })
    try{
      const options = {
        url: "/iot/pc/device/index/page",
        method: "get",
        data: {
          ...params
        }
      }

      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_COMPANY,
        deviceList: data
      })
    }catch(err){
      console.log(err, `color: ${log_color}`)
      dispatch({
        type: END_LOADING_COMPANY,
      })
    }

  }
}


export function editCompany(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_COMPANY,
    })
    try{
      const options = {
        url: "/iot/pc/company/update/"+params.id,
        method: "post",
        data: {
          ...params
        }
      }

      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_COMPANY,
      })
    }catch(err){
      console.log(err, `color: ${log_color}`)
      dispatch({
        type: END_LOADING_COMPANY,
      })
    }

  }
}

export function addCompany(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_COMPANY,
    })
    try{
      const options = {
        url: "/iot/pc/company/",
        method: "post",
        data: {
          ...params
        }
      }

      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_COMPANY,
      })
    }catch(err){
      console.log(err, `color: ${log_color}`)
      dispatch({
        type: END_LOADING_COMPANY,
      })
    }

  }
}

export function getCompany(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_COMPANY,
    })
    try{
      const options = {
        url: "/iot/pc/company/index",
        method: "get",
        data: {
          ...params
        }
      }

      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_COMPANY,
        company:data
      })
    }catch(err){
      console.log(err, `color: ${log_color}`)
      dispatch({
        type: END_LOADING_COMPANY,
      })
    }

  }
}