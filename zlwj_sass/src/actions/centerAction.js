import {START_LOADING_CENTER, END_LOADING_CENTER} from "@/types"
import {fetch } from "@/utils"
import {log_color} from "@/utils/config"


export function getListPark(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_CENTER
    })
    try{
      const options = {
        url: "/api/pc/plate/selectListPark",
        method: "get",
        data: {...params}
      }

      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_CENTER,
        parklist: data
      })

    }catch(err){
      console.log(err, `color: ${log_color}`)
      dispatch({
        type: END_LOADING_CENTER
      })
    }

  }
}

export function getPlateOrder(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_CENTER
    })
    try{
      const options = {
        url: "/api/pc/parkOrder/selectPlateOrder",
        method: "get",
        data: {...params}
      }

      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_CENTER,
        platestatis: data
      })

    }catch(err){
      console.log(err, `color: ${log_color}`)
      dispatch({
        type: END_LOADING_CENTER
      })
    }

  }
}

export function getPileDeviceLog(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_CENTER
    })
    try{
      const options = {
        url: "/api/pc/deviceLog/charge",
        method: "get",
        data: {...params}
      }

      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_CENTER,
        pilestatis: data
      })

    }catch(err){
      console.log(err, `color: ${log_color}`)
      dispatch({
        type: END_LOADING_CENTER
      })
    }

  }
}

export function getChargStatistics(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_CENTER
    })
    try{
      const options = {
        url: "/api/pc/deviceLog/chargStatistics",
        method: "get",
        data: {...params}
      }

      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_CENTER,
      })

    }catch(err){
      console.log(err, `color: ${log_color}`)
      dispatch({
        type: END_LOADING_CENTER
      })
    }

  }
}

export function detailDeviceLogStatis(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_CENTER
    })
    try{
      const options = {
        url: "/api/pc/deviceLog/logList",
        method: "get",
        data: {...params}
      }

      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_CENTER,
      })

    }catch(err){
      console.log(err, `color: ${log_color}`)
      dispatch({
        type: END_LOADING_CENTER
      })
    }

  }
}

export function getDeviceLogStatis(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_CENTER
    })
    try{
      const options = {
        url: "/api/pc/deviceLog/statistics",
        method: "get",
        data: {...params}
      }

      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_CENTER,
      })

    }catch(err){
      console.log(err, `color: ${log_color}`)
      dispatch({
        type: END_LOADING_CENTER
      })
    }

  }
}

export function getDeviceLogMonitor(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_CENTER
    })
    try{
      const options = {
        url: "/api/pc/deviceLog/monitor",
        method: "get",
        data: {...params}
      }

      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_CENTER,
        [params.type+"Log"]: data
      })

    }catch(err){
      console.log(err, `color: ${log_color}`)
      dispatch({
        type: END_LOADING_CENTER
      })
    }

  }
}