import {START_LOADING_SYSTEM, END_LOADING_SYSTEM} from "@/types"
import {log_color} from "@/utils/config"
import {fetch, setCookie, removeCookie} from "@/utils"


export function changeProcessStatus(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_SYSTEM
    })

    try{
      const options = {
        url: "/api/pc/flow/template/enable/"+params.id,
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

export function getProcess(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_SYSTEM
    })

    try{
      const options = {
        url: "/api/pc/flow/template/",
        method: "get",
        data: {
          ...params
        }
      }
      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_SYSTEM,
        process: data
      })
    }catch(err){
      dispatch({
        type: END_LOADING_SYSTEM
      })
      console.log(err, `color: ${log_color}`)
    }
  }
}

export function addProcess(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_SYSTEM
    })

    try{
      const options = {
        url: "/api/pc/flow/template/",
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

export function getSelectDict(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_SYSTEM
    })

    try{
      const options = {
        url: "/api/pc/loadSelectDict",
        method: "get",
        data: {
          ...params
        }
      }
      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_SYSTEM,
        jobList: data
      })
    }catch(err){
      dispatch({
        type: END_LOADING_SYSTEM
      })
      console.log(err, `color: ${log_color}`)
    }
  }
}

export function getSelectRole(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_SYSTEM
    })

    try{
      const options = {
        url: "/api/pc/loadSelectRole",
        method: "get",
        data: {
          ...params
        }
      }
      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_SYSTEM,
        roleList: data
      })
    }catch(err){
      dispatch({
        type: END_LOADING_SYSTEM
      })
      console.log(err, `color: ${log_color}`)
    }
  }
}

export function getSelectDept(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_SYSTEM
    })

    try{
      const options = {
        url: "/api/pc/loadSelectDept",
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

export function addOrgan(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_SYSTEM
    })

    try{
      const options = {
        url: "/api/pc/dept/",
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

export function getJobLevel(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_SYSTEM
    })

    try{
      const options = {
        url: "/api/pc/dept/loadJobLevel/",
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

export function editOrgan(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_SYSTEM
    })

    try{
      const options = {
        url: "/api/pc/dept/"+params.id,
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

export function getSupDeptDetail(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_SYSTEM
    })

    try{
      const options = {
        url: "/api/pc/dept/supDept/"+params.id,
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

export function getDeptDetail(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_SYSTEM
    })

    try{
      const options = {
        url: "/api/pc/dept/"+params.id,
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

export function getTreeDept(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_SYSTEM
    })

    try{
      const options = {
        url: "/api/pc/dept/treeDept/",
        method: "get",
        data: {
          ...params
        }
      }
      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_SYSTEM,
        organ: data
      })
    }catch(err){
      dispatch({
        type: END_LOADING_SYSTEM
      })
      console.log(err, `color: ${log_color}`)
    }
  }
}

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