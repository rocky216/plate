import {fetch} from "@/utils"
import {LOADING_PROJECT_START, LOADING_PROJECT_END} from "@/types"
import {getHouseInfo} from "@/utils"

export function roleAccountLink(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: LOADING_PROJECT_START
    })
    try {
      const options = {
        url: "/sysAccount/roleAccount",
        method: "post",
        data: params
      }
      let data = await fetch(options) 
      dispatch({
        type: LOADING_PROJECT_END,
      })
      if(next)next(data)
    }catch(err){
      console.log(err)
      dispatch({
        type: LOADING_PROJECT_END,
      })
    }
  }
}

export function accountItemLink(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: LOADING_PROJECT_START
    })
    try {
      const options = {
        url: "/sysAccount/accountItemLink",
        method: "post",
        data: params
      }
      let data = await fetch(options) 
      dispatch({
        type: LOADING_PROJECT_END,
      })
      if(next)next(data)
    }catch(err){
      console.log(err)
      dispatch({
        type: LOADING_PROJECT_END,
      })
    }
  }
}

export function addMeun(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: LOADING_PROJECT_START
    })
    try {
      const options = {
        url: "/meun/addMeun",
        method: "post",
        data: params
      }
      let data = await fetch(options) 
      dispatch({
        type: LOADING_PROJECT_END,
      })
      if(next)next(data)
    }catch(err){
      console.log(err)
      dispatch({
        type: LOADING_PROJECT_END,
      })
    }
  }
}

export function editMeun(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: LOADING_PROJECT_START
    })
    try {
      const options = {
        url: "/meun/sysMeunUpdate",
        method: "put",
        data: params
      }
      let data = await fetch(options) 
      dispatch({
        type: LOADING_PROJECT_END,
      })
      if(next)next(data)
    }catch(err){
      console.log(err)
      dispatch({
        type: LOADING_PROJECT_END,
      })
    }
  }
}

export function delMeun(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: LOADING_PROJECT_START
    })
    try {
      const options = {
        url: "/meun/delMeun",
        method: "delete",
        data: params
      }
      let data = await fetch(options) 
      dispatch({
        type: LOADING_PROJECT_END,
      })
      if(next)next(data)
    }catch(err){
      console.log(err)
      dispatch({
        type: LOADING_PROJECT_END,
      })
    }
  }
}

export function getSysMeunList(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: LOADING_PROJECT_START
    })
    try {
      const options = {
        url: "/meun/getSysMeunList",
        method: "get",
        data: params
      }
      let data = await fetch(options) 
      dispatch({
        type: LOADING_PROJECT_END,
        sysMeunList: data
      })
      if(next)next(data)
    }catch(err){
      console.log(err)
      dispatch({
        type: LOADING_PROJECT_END,
      })
    }
  }
}


export function delRoleItem(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: LOADING_PROJECT_START
    })
    try {
      const options = {
        url: "/role/delRole",
        method: "delete",
        data: params
      }
      let data = await fetch(options) 
      dispatch({
        type: LOADING_PROJECT_END
      })
      if(next)next(data)
    }catch(err){
      console.log(err)
      dispatch({
        type: LOADING_PROJECT_END,
      })
    }
  }
}

export function editRoleItem(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: LOADING_PROJECT_START
    })
    try {
      const options = {
        url: "/role/roleUpdate",
        method: "put",
        data: params
      }
      let data = await fetch(options) 
      console.log(data)
      dispatch({
        type: LOADING_PROJECT_END
      })
      if(next)next(data)
    }catch(err){
      console.log(err)
      dispatch({
        type: LOADING_PROJECT_END,
      })
    }
  }
}

export function addRoleItem(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: LOADING_PROJECT_START
    })
    try {
      const options = {
        url: "/role/addRole",
        method: "post",
        data: params
      }
      let data = await fetch(options) 
      dispatch({
        type: LOADING_PROJECT_END
      })
      if(next)next(data)
    }catch(err){
      console.log(err)
      dispatch({
        type: LOADING_PROJECT_END,
      })
    }
  }
}

export function getRoleList(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: LOADING_PROJECT_START
    })
    try {
      const options = {
        url: "/role/roleList",
        method: "get",
        data: params
      }
      let data = await fetch(options) 
      dispatch({
        type: LOADING_PROJECT_END,
        roleList: data
      })
      if(next)next(data)
    }catch(err){
      console.log(err)
      dispatch({
        type: LOADING_PROJECT_END,
      })
    }
  }
}

export function updateAccountPwd(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: LOADING_PROJECT_START
    })
    try {
      const options = {
        url: "/sysAccount/updatePassword",
        method: "put",
        data: params
      }
      let data = await fetch(options) 
      dispatch({
        type: LOADING_PROJECT_END
      })
      if(next)next(data)
    }catch(err){
      console.log(err)
      dispatch({
        type: LOADING_PROJECT_END,
      })
    }
  }
}

export function addAccount(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: LOADING_PROJECT_START
    })
    try {
      const options = {
        url: "/common/regist",
        method: "post",
        data: params
      }
      let data = await fetch(options) 
      dispatch({
        type: LOADING_PROJECT_END
      })
      if(next)next(data)
    }catch(err){
      console.log(err)
      dispatch({
        type: LOADING_PROJECT_END,
      })
    }
  }
}

export function getAccountList(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: LOADING_PROJECT_START
    })
    try {
      const options = {
        url: "/sysAccount/getSysAccountList",
        method: "get",
      }
      let data = await fetch(options) 
      dispatch({
        type: LOADING_PROJECT_END,
        accountList: data
      })
      if(next)next(data)
    }catch(err){
      console.log(err)
      dispatch({
        type: LOADING_PROJECT_END,
      })
    }
  }
}

export function deleteSysItem(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: LOADING_PROJECT_START
    })
    try {
      const options = {
        url: "/item/delSysItem",
        method: "delete",
        data: params
      }
      let data = await fetch(options) 
      dispatch({
        type: LOADING_PROJECT_END,
      })
      if(next)next(data)
    }catch(err){
      console.log(err)
      dispatch({
        type: LOADING_PROJECT_END,
      })
    }
  }
}

export function addSysItem(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: LOADING_PROJECT_START
    })
    try {
      const options = {
        url: "/item/addSysItem",
        method: "post",
        data: params
      }
      let data = await fetch(options) 
      dispatch({
        type: LOADING_PROJECT_END,
      })
      if(next)next(data)
    }catch(err){
      console.log(err)
      dispatch({
        type: LOADING_PROJECT_END,
      })
    }
  }
}

export function EditSysItem(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: LOADING_PROJECT_START
    })
    try {
      const options = {
        url: "/item/updateSysItem",
        method: "put",
        data: params
      }
      let data = await fetch(options) 
      dispatch({
        type: LOADING_PROJECT_END,
      })
      if(next)next(data)
    }catch(err){
      console.log(err)
      dispatch({
        type: LOADING_PROJECT_END,
      })
    }
  }
}

export function getSysItemList(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: LOADING_PROJECT_START
    })
    try {
      const options = {
        url: "/item/sysItemList",
        method: "get"
      }
      let data = await fetch(options) 
      
      dispatch({
        type: LOADING_PROJECT_END,
        sysItemList: data
      })
      if(next)next(data)
    }catch(err){
      console.log(err)
      dispatch({
        type: LOADING_PROJECT_END,
      })
    }
  }
}

export function setRoleMeun(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: LOADING_PROJECT_START
    })
    try {
      const options = {
        url: "/role/roleMeun",
        method: "post",
        data: params
      }
      let data = await fetch(options) 
      
      dispatch({
        type: LOADING_PROJECT_END,
      })
      if(next)next(data)
    }catch(err){
      console.log(err)
      dispatch({
        type: LOADING_PROJECT_END,
      })
    }
  }
}

export function getRoleMeunList(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: LOADING_PROJECT_START
    })
    try {
      const options = {
        url: "/role/roleMeunList",
        method: "post",
        data: params
      }
      let data = await fetch(options) 
      
      dispatch({
        type: LOADING_PROJECT_END,
      })
      if(next)next(data)
    }catch(err){
      console.log(err)
      dispatch({
        type: LOADING_PROJECT_END,
      })
    }
  }
}

export function getDeviceList(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: LOADING_PROJECT_START
    })
    try {
      const options = {
        url: "/device/list",
        method: "get",
        data: {
          ...params
        }
      }
      let data = await fetch(options) 
      
      dispatch({
        type: LOADING_PROJECT_END,
        device: data
      })
      if(next)next(data)
    }catch(err){
      console.log(err)
      dispatch({
        type: LOADING_PROJECT_END,
      })
    }
  }
}

export function editDeviceInfo(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: LOADING_PROJECT_START
    })
    try {
      const options = {
        url: "/device/updatePlateDevice",
        method: "post",
        data: {
          ...params,
          itemId: getHouseInfo()
        }
      }
      let data = await fetch(options) 
      
      dispatch({
        type: LOADING_PROJECT_END
      })
      if(next)next(data)
    }catch(err){
      console.log(err)
      dispatch({
        type: LOADING_PROJECT_END,
      })
    }
  }
}