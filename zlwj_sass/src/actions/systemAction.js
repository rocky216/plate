import {START_LOADING_SYSTEM, END_LOADING_SYSTEM} from "@/types"
import {fetch } from "@/utils"
import {log_color} from "@/utils/config"

export function onOffMerchant(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_SYSTEM
    })
    try{
      const options = {
        url: "/api/pc/sysWxAccount/onOff",
        method: "post",
        data: {...params}
      }

      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_SYSTEM,
      })

    }catch(err){
      console.log(err, `color: ${log_color}`)
      dispatch({
        type: END_LOADING_SYSTEM
      })
    }

  }
}

export function editMerchant(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_SYSTEM
    })
    try{
      const options = {
        url: "/api/pc/sysWxAccount/update",
        method: "post",
        data: {...params}
      }

      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_SYSTEM,
      })

    }catch(err){
      console.log(err, `color: ${log_color}`)
      dispatch({
        type: END_LOADING_SYSTEM
      })
    }

  }
}
export function deleteMerchant(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_SYSTEM
    })
    try{
      const options = {
        url: "/api/pc/sysWxAccount/delete",
        method: "post",
        data: {...params}
      }

      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_SYSTEM,
      })

    }catch(err){
      console.log(err, `color: ${log_color}`)
      dispatch({
        type: END_LOADING_SYSTEM
      })
    }

  }
}

export function addMerchant(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_SYSTEM
    })
    try{
      const options = {
        url: "/api/pc/sysWxAccount/add",
        method: "post",
        data: {...params}
      }

      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_SYSTEM,
      })

    }catch(err){
      console.log(err, `color: ${log_color}`)
      dispatch({
        type: END_LOADING_SYSTEM
      })
    }

  }
}

export function merchantList(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_SYSTEM
    })
    try{
      const options = {
        url: "/api/pc/sysWxAccount/list",
        method: "get",
        data: {...params}
      }

      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_SYSTEM,
        merchant: data
      })

    }catch(err){
      console.log(err, `color: ${log_color}`)
      dispatch({
        type: END_LOADING_SYSTEM
      })
    }

  }
}

export function deleteLinkHeTem(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_SYSTEM
    })
    try{
      const options = {
        url: "/api/pc/admin/sms/template/deleteLinkHe",
        method: "post",
        data: {...params}
      }

      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_SYSTEM,
      })

    }catch(err){
      console.log(err, `color: ${log_color}`)
      dispatch({
        type: END_LOADING_SYSTEM
      })
    }

  }
}

export function deleteLinkHeSign(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_SYSTEM
    })
    try{
      const options = {
        url: "/api/pc/admin/sms/sign/deleteLinkHe",
        method: "post",
        data: {...params}
      }

      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_SYSTEM,
      })

    }catch(err){
      console.log(err, `color: ${log_color}`)
      dispatch({
        type: END_LOADING_SYSTEM
      })
    }

  }
}

export function addHeLinkMsg(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_SYSTEM
    })
    try{
      const options = {
        url: "/api/pc/sms/feige/addHeLink",
        method: "post",
        data: {...params}
      }

      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_SYSTEM,
      })

    }catch(err){
      console.log(err, `color: ${log_color}`)
      dispatch({
        type: END_LOADING_SYSTEM
      })
    }

  }
}

export function deleteMesTemplate(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_SYSTEM
    })
    try{
      const options = {
        url: "/api/pc/admin/sms/template/delete",
        method: "post",
        data: {...params}
      }

      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_SYSTEM,
      })

    }catch(err){
      console.log(err, `color: ${log_color}`)
      dispatch({
        type: END_LOADING_SYSTEM
      })
    }

  }
}

export function editMesTemplate(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_SYSTEM
    })
    try{
      const options = {
        url: "/api/pc/admin/sms/template/update",
        method: "post",
        data: {...params}
      }

      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_SYSTEM,
      })

    }catch(err){
      console.log(err, `color: ${log_color}`)
      dispatch({
        type: END_LOADING_SYSTEM
      })
    }

  }
}

export function addMesTemplate(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_SYSTEM
    })
    try{
      const options = {
        url: "/api/pc/admin/sms/template/add",
        method: "post",
        data: {...params}
      }

      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_SYSTEM,
      })

    }catch(err){
      console.log(err, `color: ${log_color}`)
      dispatch({
        type: END_LOADING_SYSTEM
      })
    }

  }
}

export function getMesTemplate(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_SYSTEM
    })
    try{
      const options = {
        url: "/api/pc/admin/sms/template/listPage",
        method: "get",
        data: {...params}
      }

      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_SYSTEM,
        msgtemp: data
      })

    }catch(err){
      console.log(err, `color: ${log_color}`)
      dispatch({
        type: END_LOADING_SYSTEM
      })
    }

  }
}

export function editSign(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_SYSTEM
    })
    try{
      const options = {
        url: "/api/pc/admin/sms/sign/update",
        method: "post",
        data: {...params}
      }

      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_SYSTEM,
      })

    }catch(err){
      console.log(err, `color: ${log_color}`)
      dispatch({
        type: END_LOADING_SYSTEM
      })
    }

  }
}

export function deleteSign(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_SYSTEM
    })
    try{
      const options = {
        url: "/api/pc/admin/sms/sign/delete",
        method: "post",
        data: {...params}
      }

      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_SYSTEM,
      })

    }catch(err){
      console.log(err, `color: ${log_color}`)
      dispatch({
        type: END_LOADING_SYSTEM
      })
    }

  }
}

export function getSignList(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_SYSTEM
    })
    try{
      const options = {
        url: "/api/pc/admin/sms/sign/listPage",
        method: "get",
        data: {...params}
      }

      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_SYSTEM,
        sign: data
      })

    }catch(err){
      console.log(err, `color: ${log_color}`)
      dispatch({
        type: END_LOADING_SYSTEM
      })
    }

  }
}

export function addSign(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_SYSTEM
    })
    try{
      const options = {
        url: "/api/pc/admin/sms/sign/add",
        method: "post",
        data: {...params}
      }

      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_SYSTEM,
      })

    }catch(err){
      console.log(err, `color: ${log_color}`)
      dispatch({
        type: END_LOADING_SYSTEM
      })
    }

  }
}

export function getHeList(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_SYSTEM
    })
    try{
      const options = {
        url: "/api/pc/admin/company/getListByCompanyId",
        method: "get",
        data: {...params}
      }

      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_SYSTEM,
        he: data
      })

    }catch(err){
      console.log(err, `color: ${log_color}`)
      dispatch({
        type: END_LOADING_SYSTEM
      })
    }

  }
}

export function sendMessage(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_SYSTEM
    })
    try{
      const options = {
        url: "/api/pc/sms/feige/sendCustom",
        method: "post",
        data: {...params}
      }

      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_SYSTEM,
      })

    }catch(err){
      console.log(err, `color: ${log_color}`)
      dispatch({
        type: END_LOADING_SYSTEM
      })
    }

  }
}

export function getCompany(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_SYSTEM
    })
    try{
      const options = {
        url: "/api/pc/admin/company/list",
        method: "post",
        data: {...params}
      }

      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_SYSTEM,
        company: data
      })

    }catch(err){
      console.log(err, `color: ${log_color}`)
      dispatch({
        type: END_LOADING_SYSTEM
      })
    }

  }
}

export function deleteSysLibrary(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_SYSTEM
    })
    try{
      const options = {
        url: "/api/pc/admin/dict/delete",
        method: "post",
        data: {...params}
      }

      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_SYSTEM,
      })

    }catch(err){
      console.log(err, `color: ${log_color}`)
      dispatch({
        type: END_LOADING_SYSTEM
      })
    }

  }
}

export function AddSysLibrary(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_SYSTEM
    })
    try{
      const options = {
        url: "/api/pc/admin/dict/add",
        method: "post",
        data: {...params}
      }

      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_SYSTEM,
      })

    }catch(err){
      console.log(err, `color: ${log_color}`)
      dispatch({
        type: END_LOADING_SYSTEM
      })
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
        url: "/api/pc/admin/dict/addDictData",
        method: "post",
        data: {...params}
      }

      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_SYSTEM,
      })

    }catch(err){
      console.log(err, `color: ${log_color}`)
      dispatch({
        type: END_LOADING_SYSTEM
      })
    }

  }
}

export function delDictData(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_SYSTEM
    })
    try{
      const options = {
        url: "/api/pc/admin/dict/delDictData",
        method: "post",
        data: {...params}
      }

      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_SYSTEM,
      })

    }catch(err){
      console.log(err, `color: ${log_color}`)
      dispatch({
        type: END_LOADING_SYSTEM
      })
    }

  }
}

export function getSysLibrary(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_SYSTEM
    })
    try{
      const options = {
        url: "/api/pc/admin/dict/listPage",
        method: "get",
        data: {...params}
      }

      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_SYSTEM,
        sysLibrary: data
      })

    }catch(err){
      console.log(err, `color: ${log_color}`)
      dispatch({
        type: END_LOADING_SYSTEM
      })
    }

  }
}

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