import {START_LOADING_APP, END_LOADING_APP} from "@/types"
import {fetch } from "@/utils"
import {log_color} from "@/utils/config"
import { setCookie, getCookie, getToken} from "../utils"


export function updatePassword(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_APP,
    })
    try{
      const options = {
        url: "/api/pc/userInfo/updatePassword",
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
    }catch(err){
      console.log(err, `color: ${log_color}`)
      dispatch({
        type: END_LOADING_APP,
      })
    }

  }
}

export function editPerson(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_APP,
    })
    try{
      const options = {
        url: "/api/pc/userInfo/updateAtta",
        method: "post",
        data: {...params}
      }

      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_APP,
      })
    }catch(err){
      console.log(err, `color: ${log_color}`)
      dispatch({
        type: END_LOADING_APP,
      })
    }

  }
}

export function getCommonFile(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_APP,
    })
    try{
      const options = {
        url: "/api/pc/loadCommonFile",
        method: "get",
        data: {...params}
      }

      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_APP,
        commonFiles: data
      })
    }catch(err){
      console.log(err, `color: ${log_color}`)
      dispatch({
        type: END_LOADING_APP,
      })
    }

  }
}

export function updateNowHe(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_APP,
    })
    try{
      const options = {
        url: "/api/pc/updateNowHe",
        method: "post",
        data: {...params}
      }

      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_APP
      })
    }catch(err){
      console.log(err, `color: ${log_color}`)
      dispatch({
        type: END_LOADING_APP,
      })
    }

  }
}

export function getSelectHeList(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_APP,
    })
    try{
      const options = {
        url: "/api/pc/loadSelectHeList",
        method: "get",
        data: {}
      }

      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_APP,
        allHeList: data
      })
    }catch(err){
      console.log(err, `color: ${log_color}`)
      dispatch({
        type: END_LOADING_APP,
      })
    }

  }
}

export function getBaseInfo(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_APP,
    })
    try{
      const options = {
        url: "/api/pc/loadBaseInfo",
        method: "get",
        data: {}
      }

      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_APP,
        baseInfo: data
      })
    }catch(err){
      console.log(err, `color: ${log_color}`)
      dispatch({
        type: END_LOADING_APP,
      })
    }

  }
}

export function goLoginOut(params, next){
  return async function(dispatch, getState){
    try{
      const options = {
        url: "/api/pc/logout",
        method: "post",
        data: {
          
        }
      }

      let data = await fetch(options)
      if(next)next(data)

    }catch(err){
      console.log(err, `color: ${log_color}`)
    }

  }
}

export function setCollapsedTrue(){
  return async function(dispatch, getState){
    dispatch({
      type: END_LOADING_APP,
      collapsed: true
    })
  }
}

export function setCollapsedFalse(){
  return async function(dispatch, getState){
    dispatch({
      type: END_LOADING_APP,
      collapsed: false
    })
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
        data: {...params}
      }

      let data = await fetch(options)
      dispatch({
        type: END_LOADING_APP,
        token: data
      })
      if(next)next(data)
      setCookie("token", data)
    }catch(err){
      dispatch({
        type: END_LOADING_APP
      })
      console.log(err, `color: ${log_color}`)
    }

  }
}

export function getVerifyCodeImg(params, next){
  return async function(dispatch, getState){
    try{
      const options = {
        url: "/api/pc/verifyCodeImg",
        method: "get"
      }

      let data = await fetch(options)
      if(next)next(data)
    }catch(err){
      console.log(err, `color: ${log_color}`)
    }

  }
}

