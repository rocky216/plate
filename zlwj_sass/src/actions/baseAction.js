import {START_LOADING_BASE, END_LOADING_BASE} from "@/types"
import {fetch } from "@/utils"
import {log_color} from "@/utils/config"

export function addRoleDetail(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_BASE
    })
    try{
      const options = {
        url: "/api/pc/role/add",
        method: "post",
        data: {...params}
      }

      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_BASE,
      })

    }catch(err){
      console.log(err, `color: ${log_color}`)
      dispatch({
        type: END_LOADING_BASE
      })
    }

  }
}

export function editRoleDetail(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_BASE
    })
    try{
      const options = {
        url: "/api/pc/role/update",
        method: "post",
        data: {...params}
      }

      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_BASE,
      })

    }catch(err){
      console.log(err, `color: ${log_color}`)
      dispatch({
        type: END_LOADING_BASE
      })
    }

  }
}

export function getRoleDetail(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_BASE
    })
    try{
      const options = {
        url: "/api/pc/role/get",
        method: "get",
        data: {...params}
      }

      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_BASE,
      })

    }catch(err){
      console.log(err, `color: ${log_color}`)
      dispatch({
        type: END_LOADING_BASE
      })
    }

  }
}

export function updateMenuList(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_BASE
    })
    try{
      const options = {
        url: "/api/pc/role/updateRoleMenu",
        method: "post",
        data: {...params}
      }

      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_BASE,
      })

    }catch(err){
      console.log(err, `color: ${log_color}`)
      dispatch({
        type: END_LOADING_BASE
      })
    }

  }
}

export function clearTreeMenuList(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_BASE
    })
    try{
      dispatch({
        type: END_LOADING_BASE,
        editRole: ''
      })
    }catch(err){
      console.log(err, `color: ${log_color}`)
      dispatch({
        type: END_LOADING_BASE
      })
    }

  }
}

export function getTreeMenuList(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_BASE
    })
    try{
      const options = {
        url: "/api/pc/role/loadTreeMenuList",
        method: "get",
        data: {...params}
      }

      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_BASE,
        editRole: data
      })

    }catch(err){
      console.log(err, `color: ${log_color}`)
      dispatch({
        type: END_LOADING_BASE
      })
    }

  }
}

export function deleteRole(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_BASE
    })
    try{
      const options = {
        url: "/api/pc/role/delete",
        method: "post",
        data: {...params}
      }

      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_BASE
      })

    }catch(err){
      console.log(err, `color: ${log_color}`)
      dispatch({
        type: END_LOADING_BASE
      })
    }

  }
}

export function getRoleList(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_BASE
    })
    try{
      const options = {
        url: "/api/pc/role/listPage",
        method: "get",
        data: {...params}
      }

      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_BASE,
        roleList: data
      })

    }catch(err){
      console.log(err, `color: ${log_color}`)
      dispatch({
        type: END_LOADING_BASE
      })
    }

  }
}

export function deleteStation(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_BASE
    })
    try{
      const options = {
        url: "/api/pc/job/delete",
        method: "post",
        data: {...params}
      }

      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_BASE
      })

    }catch(err){
      console.log(err, `color: ${log_color}`)
      dispatch({
        type: END_LOADING_BASE
      })
    }

  }
}

export function editStation(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_BASE
    })
    try{
      const options = {
        url: "/api/pc/job/update",
        method: "post",
        data: {...params}
      }

      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_BASE
      })

    }catch(err){
      console.log(err, `color: ${log_color}`)
      dispatch({
        type: END_LOADING_BASE
      })
    }

  }
}

export function addStation(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_BASE
    })
    try{
      const options = {
        url: "/api/pc/job/add",
        method: "post",
        data: {...params}
      }

      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_BASE
      })

    }catch(err){
      console.log(err, `color: ${log_color}`)
      dispatch({
        type: END_LOADING_BASE
      })
    }

  }
}

export function getStationList(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_BASE
    })
    try{
      const options = {
        url: "/api/pc/job/getPage",
        method: "get",
        data: {...params}
      }

      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_BASE,
        station: data
      })

    }catch(err){
      console.log(err, `color: ${log_color}`)
      dispatch({
        type: END_LOADING_BASE
      })
    }

  }
}

export function deleteTreeDept(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_BASE
    })
    try{
      const options = {
        url: "/api/pc/dept/delete",
        method: "post",
        data: {...params}
      }

      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_BASE
      })

    }catch(err){
      console.log(err, `color: ${log_color}`)
      dispatch({
        type: END_LOADING_BASE
      })
    }

  }
}

export function editTreeDept(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_BASE
    })
    try{
      const options = {
        url: "/api/pc/dept/update",
        method: "post",
        data: {...params}
      }

      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_BASE
      })

    }catch(err){
      console.log(err, `color: ${log_color}`)
      dispatch({
        type: END_LOADING_BASE
      })
    }

  }
}

export function addTreeDept(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_BASE
    })
    try{
      const options = {
        url: "/api/pc/dept/add",
        method: "post",
        data: {...params}
      }

      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_BASE
      })

    }catch(err){
      console.log(err, `color: ${log_color}`)
      dispatch({
        type: END_LOADING_BASE
      })
    }

  }
}

export function getTreeDeptList(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_BASE
    })
    try{
      const options = {
        url: "/api/pc/dept/loadTreeDeptList",
        method: "get",
        data: {...params}
      }

      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_BASE,
        departmentList: data
      })

    }catch(err){
      console.log(err, `color: ${log_color}`)
      dispatch({
        type: END_LOADING_BASE
      })
    }

  }
}