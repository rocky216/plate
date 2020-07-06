import {START_LOADING_FINANCE, END_LOADING_FINANCE} from "@/types"
import {fetch } from "@/utils"
import {log_color} from "@/utils/config"

export function deleteCostActive(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_FINANCE,
    })
    try{
      const options = {
        url: "/api/pc/costActive/delete",
        method: "post",
        data: {
          ...params
        }
      }

      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_FINANCE,
      })
    }catch(err){
      console.log(err, `color: ${log_color}`)
      dispatch({
        type: END_LOADING_FINANCE,
      })
    }

  }
}

export function editCostActive(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_FINANCE,
    })
    try{
      const options = {
        url: "/api/pc/costActive/update",
        method: "post",
        data: {
          ...params
        }
      }

      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_FINANCE,
      })
    }catch(err){
      console.log(err, `color: ${log_color}`)
      dispatch({
        type: END_LOADING_FINANCE,
      })
    }

  }
}

export function addCostActive(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_FINANCE,
    })
    try{
      const options = {
        url: "/api/pc/costActive/add",
        method: "post",
        data: {
          ...params
        }
      }

      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_FINANCE,
      })
    }catch(err){
      console.log(err, `color: ${log_color}`)
      dispatch({
        type: END_LOADING_FINANCE,
      })
    }

  }
}

export function getCostActive(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_FINANCE,
    })
    try{
      const options = {
        url: "/api/pc/costActive/listPage",
        method: "get",
        data: {
          ...params
        }
      }

      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_FINANCE,
        costactivity: data
      })
    }catch(err){
      console.log(err, `color: ${log_color}`)
      dispatch({
        type: END_LOADING_FINANCE,
      })
    }

  }
}

export function getPropertyTemplateDetail(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_FINANCE,
    })
    try{
      const options = {
        url: "/api/pc/propertyTemplate/get",
        method: "get",
        data: {
          ...params
        }
      }

      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_FINANCE,
      })
    }catch(err){
      console.log(err, `color: ${log_color}`)
      dispatch({
        type: END_LOADING_FINANCE,
      })
    }

  }
}

export function editPropertyTemplate(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_FINANCE,
    })
    try{
      const options = {
        url: "/api/pc/propertyTemplate/update",
        method: "post",
        data: {
          ...params
        }
      }

      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_FINANCE,
      })
    }catch(err){
      console.log(err, `color: ${log_color}`)
      dispatch({
        type: END_LOADING_FINANCE,
      })
    }

  }
}

export function addPropertyTemplate(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_FINANCE,
    })
    try{
      const options = {
        url: "/api/pc/propertyTemplate/add",
        method: "post",
        data: {
          ...params
        }
      }

      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_FINANCE,
      })
    }catch(err){
      console.log(err, `color: ${log_color}`)
      dispatch({
        type: END_LOADING_FINANCE,
      })
    }

  }
}

export function getPropertyTemplate(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_FINANCE,
    })
    try{
      const options = {
        url: "/api/pc/propertyTemplate/listPage",
        method: "get",
        data: {
          ...params
        }
      }

      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_FINANCE,
        propertytem: data
      })
    }catch(err){
      console.log(err, `color: ${log_color}`)
      dispatch({
        type: END_LOADING_FINANCE,
      })
    }

  }
}

export function getAccountLog(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_FINANCE,
    })
    try{
      const options = {
        url: "/api/pc/accountLog/listPage",
        method: "get",
        data: {
          ...params
        }
      }

      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_FINANCE,
        accountLog: data
      })
    }catch(err){
      console.log(err, `color: ${log_color}`)
      dispatch({
        type: END_LOADING_FINANCE,
      })
    }

  }
}

export function editAccount(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_FINANCE,
    })
    try{
      const options = {
        url: "/api/pc/account/update",
        method: "post",
        data: {
          ...params
        }
      }

      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_FINANCE,
      })
    }catch(err){
      console.log(err, `color: ${log_color}`)
      dispatch({
        type: END_LOADING_FINANCE,
      })
    }

  }
}

export function addAccount(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_FINANCE,
    })
    try{
      const options = {
        url: "/api/pc/account/add",
        method: "post",
        data: {
          ...params
        }
      }

      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_FINANCE,
      })
    }catch(err){
      console.log(err, `color: ${log_color}`)
      dispatch({
        type: END_LOADING_FINANCE,
      })
    }

  }
}

export function getAccounts(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_FINANCE,
    })
    try{
      const options = {
        url: "/api/pc/account/listPage",
        method: "get",
        data: {
          ...params
        }
      }

      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_FINANCE,
        account: data
      })
    }catch(err){
      console.log(err, `color: ${log_color}`)
      dispatch({
        type: END_LOADING_FINANCE,
      })
    }

  }
}