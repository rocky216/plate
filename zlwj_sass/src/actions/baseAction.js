import {START_LOADING_BASE, END_LOADING_BASE} from "@/types"
import {fetch } from "@/utils"
import {log_color} from "@/utils/config"



export function deleteLibrary(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_BASE
    })
    try{
      const options = {
        url: "/api/pc/dict/delDictData",
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

export function addLibrary(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_BASE
    })
    try{
      const options = {
        url: "/api/pc/dict/addDictData",
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

export function getLibraryList(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_BASE
    })
    try{
      const options = {
        url: "/api/pc/dict/listPage",
        method: "get",
        data: {...params}
      }

      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_BASE,
        library: data
      })

    }catch(err){
      console.log(err, `color: ${log_color}`)
      dispatch({
        type: END_LOADING_BASE
      })
    }

  }
}

export function getMeunLevel(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_BASE
    })
    try{
      const options = {
        url: "/api/pc/loadMeunLevel",
        method: "get",
        data: {...params}
      }

      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_BASE,
        meunLevel: data
      })

    }catch(err){
      console.log(err, `color: ${log_color}`)
      dispatch({
        type: END_LOADING_BASE
      })
    }

  }
}

export function editStaffTreeMenu(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_BASE
    })
    try{
      const options = {
        url: "/api/pc/user/updateUserMenu",
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

export function editStaff(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_BASE
    })
    try{
      const options = {
        url: "/api/pc/user/update",
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

export function clearUserTreeMenuList(){
  return async function(dispatch, getState){
    try{
      dispatch({
        type: END_LOADING_BASE,
        myRoles: ''
      })

    }catch(err){
      console.log(err, `color: ${log_color}`)
      dispatch({
        type: END_LOADING_BASE
      })
    }
  }
}

export function getUserTreeMenuList(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_BASE
    })
    try{
      const options = {
        url: "/api/pc/user/loadTreeMenuList",
        method: "get",
        data: {...params}
      }

      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_BASE,
        myRoles: data
      })

    }catch(err){
      console.log(err, `color: ${log_color}`)
      dispatch({
        type: END_LOADING_BASE
      })
    }
  }
}

export function getStaffDetail(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_BASE
    })
    try{
      const options = {
        url: "/api/pc/user/get",
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

export function deleteStaff(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_BASE
    })
    try{
      const options = {
        url: "/api/pc/user/delete",
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

export function getSelectRoleList(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_BASE
    })
    try{
      const options = {
        url: "/api/pc/loadSelectRoleList",
        method: "get",
        data: {...params}
      }

      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_BASE,
        roleListAll: data
      })

    }catch(err){
      console.log(err, `color: ${log_color}`)
      dispatch({
        type: END_LOADING_BASE
      })
    }

  }
}

export function getSelectJobList(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_BASE
    })
    try{
      const options = {
        url: "/api/pc/loadSelectJobList",
        method: "get",
        data: {...params}
      }
      if(getState().base.jobList) return
      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_BASE,
        jobList: data
      })

    }catch(err){
      console.log(err, `color: ${log_color}`)
      dispatch({
        type: END_LOADING_BASE
      })
    }

  } 
}

export function getHeList(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_BASE
    })
    try{
      const options = {
        url: "/api/pc/loadSelectHeList",
        method: "get",
        data: {...params}
      }
      if(getState().base.heList) return
      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_BASE,
        heList: data
      })

    }catch(err){
      console.log(err, `color: ${log_color}`)
      dispatch({
        type: END_LOADING_BASE
      })
    }

  }
}

export function getDeptList(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_BASE
    })
    try{
      const options = {
        url: "/api/pc/loadSelectTreeDeptList",
        method: "get",
        data: {...params}
      }
      if(getState().base.deptList) return
      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_BASE,
        deptList: data
      })

    }catch(err){
      console.log(err, `color: ${log_color}`)
      dispatch({
        type: END_LOADING_BASE
      })
    }

  }
}

export function addStaff(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_BASE
    })
    try{
      const options = {
        url: "/api/pc/user/add",
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

export function getStaffList(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_BASE
    })
    try{
      const options = {
        url: "/api/pc/user/listPage",
        method: "get",
        data: {...params}
      }

      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_BASE,
        staff: data
      })

    }catch(err){
      console.log(err, `color: ${log_color}`)
      dispatch({
        type: END_LOADING_BASE
      })
    }

  }
}

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