import {START_LOADING_SYSTEM, END_LOADING_SYSTEM} from "@/types"
import {fetch } from "@/utils"
import {log_color} from "@/utils/config"


export function editTreeMenu(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_SYSTEM
    })
    try{
      const options = {
        url: "/api/pc/admin/roleMenu/update",
        method: "post",
        data: {...params}
      }

      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_SYSTEM
      })

    }catch(err){
      console.log(err, `color: ${log_color}`)
      dispatch({
        type: END_LOADING_SYSTEM
      })
    }

  }
}

export function deleteTreeMenu(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_SYSTEM
    })
    try{
      const options = {
        url: "/api/pc/admin/roleMenu/delete",
        method: "post",
        data: {...params}
      }

      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_SYSTEM
      })

    }catch(err){
      console.log(err, `color: ${log_color}`)
      dispatch({
        type: END_LOADING_SYSTEM
      })
    }

  }
}

export function addTreeMenu(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_SYSTEM
    })
    try{
      const options = {
        url: "/api/pc/admin/roleMenu/add",
        method: "post",
        data: {...params}
      }

      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_SYSTEM
      })

    }catch(err){
      console.log(err, `color: ${log_color}`)
      dispatch({
        type: END_LOADING_SYSTEM
      })
    }

  }
}

export function getTreeMenuList(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_SYSTEM
    })
    try{
      const options = {
        url: "/api/pc/admin/roleMenu/loadTreeMenuList",
        method: "get",
        data: {
          
        }
      }

      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_SYSTEM,
        treemenu: data
      })

    }catch(err){
      console.log(err, `color: ${log_color}`)
      dispatch({
        type: END_LOADING_SYSTEM
      })
    }

  }
}