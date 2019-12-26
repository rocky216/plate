import {START_LOADING_SYSTEM, END_LOADING_SYSTEM} from "@/types"
import {log_color} from "@/utils/config"
import {fetch, setCookie, removeCookie} from "@/utils"

export function deleteDictData(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_SYSTEM
    })

    try{
      const options = {
        url: "/api/pc/dictData/delete/"+params.id,
        method: "put",
        data: {
          ...params
        }
      }
      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_SYSTEM,
      })
    }catch(err){
      dispatch({
        type: END_LOADING_SYSTEM
      })
      console.log(err, `color: ${log_color}`)
    }
  }
}

export function editDictData(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_SYSTEM
    })

    try{
      const options = {
        url: "/api/pc/dictData/"+params.id,
        method: "put",
        data: {
          ...params
        }
      }
      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_SYSTEM,
      })
    }catch(err){
      dispatch({
        type: END_LOADING_SYSTEM
      })
      console.log(err, `color: ${log_color}`)
    }
  }
}

export function addDictData(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_SYSTEM
    })

    try{
      const options = {
        url: "/api/pc/dictData/",
        method: "post",
        data: {
          ...params
        }
      }
      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_SYSTEM,
      })
    }catch(err){
      dispatch({
        type: END_LOADING_SYSTEM
      })
      console.log(err, `color: ${log_color}`)
    }
  }
}

export function getDictData(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_SYSTEM
    })

    try{
      const options = {
        url: "/api/pc/dictData/",
        method: "get",
        data: {
          ...params
        }
      }
      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_SYSTEM,
        typekey: data
      })
    }catch(err){
      dispatch({
        type: END_LOADING_SYSTEM
      })
      console.log(err, `color: ${log_color}`)
    }
  }
}

export function getDictType(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_SYSTEM
    })

    try{
      const options = {
        url: "/api/pc/dictType/",
        method: "get",
        data: {
          ...params
        }
      }
      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_SYSTEM,
        diction: data
      })
    }catch(err){
      dispatch({
        type: END_LOADING_SYSTEM
      })
      console.log(err, `color: ${log_color}`)
    }
  }
}

export function deleteRole(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_SYSTEM
    })

    try{
      const options = {
        url: "/api/pc/role/delete/"+params.id,
        method: "put",
        data: {
          ...params
        }
      }
      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_SYSTEM,
      })
    }catch(err){
      dispatch({
        type: END_LOADING_SYSTEM
      })
      console.log(err, `color: ${log_color}`)
    }
  }
}

export function getRoleList(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_SYSTEM
    })

    try{
      const options = {
        url: "/api/pc/role/",
        method: "get",
        data: {
          ...params
        }
      }
      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_SYSTEM,
        role: data
      })
    }catch(err){
      dispatch({
        type: END_LOADING_SYSTEM
      })
      console.log(err, `color: ${log_color}`)
    }
  }
}

export function getRoleDetail(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_SYSTEM
    })

    try{
      const options = {
        url: "/api/pc/role/"+params.id,
        method: "get",
        data: {
        }
      }
      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_SYSTEM,
      })
    }catch(err){
      dispatch({
        type: END_LOADING_SYSTEM
      })
      console.log(err, `color: ${log_color}`)
    }
  }
}

export function editRole(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_SYSTEM
    })

    try{
      const options = {
        url: "/api/pc/role/"+params.id,
        method: "put",
        data: {
          ...params
        }
      }
      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_SYSTEM,
      })
    }catch(err){
      dispatch({
        type: END_LOADING_SYSTEM
      })
      console.log(err, `color: ${log_color}`)
    }
  }
}

export function addRole(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_SYSTEM
    })

    try{
      const options = {
        url: "/api/pc/role/",
        method: "post",
        data: {
          ...params
        }
      }
      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_SYSTEM,
      })
    }catch(err){
      dispatch({
        type: END_LOADING_SYSTEM
      })
      console.log(err, `color: ${log_color}`)
    }
  }
}

export function getTreeRole(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_SYSTEM
    })

    try{
      const options = {
        url: "/api/pc/role/treeRole/",
        method: "get",
        data: {
          ...params
        }
      }
      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_SYSTEM,
      })
    }catch(err){
      dispatch({
        type: END_LOADING_SYSTEM
      })
      console.log(err, `color: ${log_color}`)
    }
  }
}