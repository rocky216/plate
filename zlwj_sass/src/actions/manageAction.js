import {START_LOADING_MANAGE, END_LOADING_MANAGE} from "@/types"
import {fetch } from "@/utils"
import {log_color} from "@/utils/config"

export function expendCheckSignException(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_MANAGE
    })
    try{
      const options = {
        url: "/api/pc/otherExpendOrder/checkSignException",
        method: "post",
        data: {...params}
      }

      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_MANAGE,
      })

    }catch(err){
      console.log(err, `color: ${log_color}`)
      dispatch({
        type: END_LOADING_MANAGE
      })
    }

  }
}

export function getOtherExpendDesc(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_MANAGE
    })
    try{
      const options = {
        url: "/api/pc/otherExpendOrder/getOtherExpendDesc",
        method: "post",
        data: {...params}
      }

      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_MANAGE,
      })

    }catch(err){
      console.log(err, `color: ${log_color}`)
      dispatch({
        type: END_LOADING_MANAGE
      })
    }

  }
}


export function getOtherExpendListAuth(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_MANAGE
    })
    try{
      const options = {
        url: "/api/pc/otherExpendOrder/getOtherExpendListAuth",
        method: "get",
        data: {...params}
      }

      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_MANAGE,
        allexpend: data
      })

    }catch(err){
      console.log(err, `color: ${log_color}`)
      dispatch({
        type: END_LOADING_MANAGE
      })
    }

  }
}

export function checkSignException(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_MANAGE
    })
    try{
      const options = {
        url: "/api/pc/otherCostsOrder/checkSignException",
        method: "post",
        data: {...params}
      }

      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_MANAGE,
      })

    }catch(err){
      console.log(err, `color: ${log_color}`)
      dispatch({
        type: END_LOADING_MANAGE
      })
    }

  }
}

export function getOtherCostsOrderListAuth(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_MANAGE
    })
    try{
      const options = {
        url: "/api/pc/otherCostsOrder/getOtherCostsOrderListAuth",
        method: "get",
        data: {...params}
      }

      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_MANAGE,
        otherOrder: data
      })

    }catch(err){
      console.log(err, `color: ${log_color}`)
      dispatch({
        type: END_LOADING_MANAGE
      })
    }

  }
}

export function checkOrderException(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_MANAGE
    })
    try{
      const options = {
        url: "/api/pc/propertyOrder/checkOrderException",
        method: "post",
        data: {...params}
      }

      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_MANAGE,
      })

    }catch(err){
      console.log(err, `color: ${log_color}`)
      dispatch({
        type: END_LOADING_MANAGE
      })
    }

  }
}

export function getShopsPropertyOrder(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_MANAGE
    })
    try{
      const options = {
        url: "/api/pc/shopsPropertyOrder/get",
        method: "get",
        data: {...params}
      }

      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_MANAGE,
      })

    }catch(err){
      console.log(err, `color: ${log_color}`)
      dispatch({
        type: END_LOADING_MANAGE
      })
    }

  }
}

export function getHousePropertyOrder(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_MANAGE
    })
    try{
      const options = {
        url: "/api/pc/housePropertyOrder/get",
        method: "get",
        data: {...params}
      }

      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_MANAGE,
      })

    }catch(err){
      console.log(err, `color: ${log_color}`)
      dispatch({
        type: END_LOADING_MANAGE
      })
    }

  }
}

export function getAllProject(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_MANAGE
    })
    try{
      const options = {
        url: "/api/pc/heHousingEstate/listPage",
        method: "get",
        data: {...params}
      }

      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_MANAGE,
        allproject: data
      })

    }catch(err){
      console.log(err, `color: ${log_color}`)
      dispatch({
        type: END_LOADING_MANAGE
      })
    }

  }
}

export function getAllPropertyOrder(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_MANAGE
    })
    try{
      const options = {
        url: "/api/pc/propertyOrder/listPage",
        method: "get",
        data: {...params}
      }

      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_MANAGE,
        allorder: data
      })

    }catch(err){
      console.log(err, `color: ${log_color}`)
      dispatch({
        type: END_LOADING_MANAGE
      })
    }

  }
}

export function deleteOperative(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_MANAGE
    })
    try{
      const options = {
        url: "/api/pc/operative/delete",
        method: "post",
        data: {...params}
      }

      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_MANAGE
      })

    }catch(err){
      console.log(err, `color: ${log_color}`)
      dispatch({
        type: END_LOADING_MANAGE
      })
    }

  }
}

export function editOperative(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_MANAGE
    })
    try{
      const options = {
        url: "/api/pc/operative/update",
        method: "post",
        data: {...params}
      }

      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_MANAGE
      })

    }catch(err){
      console.log(err, `color: ${log_color}`)
      dispatch({
        type: END_LOADING_MANAGE
      })
    }

  }
}

export function addOperative(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_MANAGE
    })
    try{
      const options = {
        url: "/api/pc/operative/add",
        method: "post",
        data: {...params}
      }

      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_MANAGE
      })

    }catch(err){
      console.log(err, `color: ${log_color}`)
      dispatch({
        type: END_LOADING_MANAGE
      })
    }

  }
}

export function getOperative(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_MANAGE
    })
    try{
      const options = {
        url: "/api/pc/operative/listPage",
        method: "get",
        data: {...params}
      }

      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_MANAGE,
        operative: data
      })

    }catch(err){
      console.log(err, `color: ${log_color}`)
      dispatch({
        type: END_LOADING_MANAGE
      })
    }

  }
}