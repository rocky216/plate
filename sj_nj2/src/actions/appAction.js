import {START_LOADING_APP, END_LOADING_APP} from "@/types"
import {log_color} from "@/utils/config"
import {fetch, setCookie, removeCookie} from "@/utils"

export function goLoginOut(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_APP
    })

    try{
      const options = {
        url: "/api/pc/logout",
        method: "post",
        data: {
          ...params
        }
      }
      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_APP,
      })
      removeCookie("token")
    }catch(err){
      dispatch({
        type: END_LOADING_APP
      })
      console.log(err, `color: ${log_color}`)
    }
  }
}

export function loadIndexBaseInfo(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_APP
    })

    try{
      const options = {
        url: "/api/pc/loadIndexBaseInfo",
        method: "get",
        data: {
          ...params
        }
      }
      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_APP,
        base: data
      })
    }catch(err){
      dispatch({
        type: END_LOADING_APP
      })
      console.log(err, `color: ${log_color}`)
    }
  }
}

export function goLogin(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_APP
    })

    try{
      const options = {
        url: "/api/pc/login",
        method: "post",
        data: {
          ...params
        }
      }
      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_APP,
        token: data.token
      })
      setCookie("token", data.token)
    }catch(err){
      dispatch({
        type: END_LOADING_APP
      })
      console.log(err, `color: ${log_color}`)
    }

  }
}