import {START_LOADING_APP, END_LOADING_APP} from "@/types"
import {fetch } from "@/utils"
import {log_color} from "@/utils/config"
import { setCookie, getCookie, getToken} from "../utils"
import routermenus from "@/routers/routermenus"

export function loadCarparkList(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_APP,
    })
    try{
      const options = {
        url: "/api/pc/loadCarparkList",
        method: "get",
        data: {
          ...params
        }
      }

      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_APP,
        loadcarpark: data
      })
    }catch(err){
      console.log(err, `color: ${log_color}`)
      dispatch({
        type: END_LOADING_APP,
      })
    }

  }
}

export function getCompanyProject(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_APP,
    })
    try{
      const options = {
        url: "/api/pc/admin/loadCompanyAndHe",
        method: "get",
        data: {
          ...params
        }
      }

      let data = await fetch(options)
      if(next)next(data)
      function handlenData(arr){
        if(!_.isArray(arr)) return []
        _.each(arr, item=>{
          if(item.children && !item.children.length){
            item.children = null
          }else{
            if(item.children && item.children.length){
              handlenData(item.children)
            }
          }
        })
      }
      handlenData(data)
      
      dispatch({
        type: END_LOADING_APP,
        companyPro: data
      })
    }catch(err){
      console.log(err, `color: ${log_color}`)
      dispatch({
        type: END_LOADING_APP,
      })
    }

  }
}

export function getSearchPlate(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_APP,
    })
    try{
      const options = {
        url: "/api/pc/carInfo/list",
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

export function getOwnersListByNameOrPhone(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_APP,
    })
    try{
      const options = {
        url: "/api/pc/loadOwnersListByNameOrPhone",
        method: "get",
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

function querySrirng(obj, key){
  let r = ''
  let str = obj.location.search.substring(1)
  let arr = str.split("&")
  _.each(arr, item=>{
    let a = item.split("=")
    if(a[0]==key){
      r = a[1]
    }
  })
  return r
}


export function AddTab(params, next){
  return async function(dispatch, getState){
    try{
      let arr = _.cloneDeep(getState().app.keeptabs)
      let index = _.findIndex(arr, o=>o.link==params.location.pathname)
      if(index>-1) return
      
      arr.push({
        title: params.name,
        link: params.location.pathname,
        query: {
          t: "tab"
        }
      })
      dispatch({
        type: END_LOADING_APP,
        keeptabs: arr
      })

    }catch(err){
      console.log(err, `color: ${log_color}`)
    }

  }
}

export function removeTab(params, link, next){
  return async function(dispatch, getState){
    try{
      let arr = getState().app.keeptabs
      if(arr.length===1) return
      console.log(params.location)
      if(params.location.pathname===link){
        params.history.push(arr[0]["link"])
      }
      let newArr = _.filter(arr, o=>o.link!==link)

      dispatch({
        type: END_LOADING_APP,
        keeptabs: newArr
      })

    }catch(err){
      console.log(err, `color: ${log_color}`)
    }

  }
}

