import {START_LOADING_DEVICE, END_LOADING_DEVICE } from "@/types"
import {log_color} from "@/utils/config"
import {fetch} from "@/utils"

export function editAlldevice(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_DEVICE,
    })
    try{
      const options = {
        url: "/iot/pc/device/co/update/"+params.id,
        method: "post",
        data: {
          ...params
        }
      }

      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_DEVICE,
      })
    }catch(err){
      console.log(err, `color: ${log_color}`)
      dispatch({
        type: END_LOADING_DEVICE,
      })
    }

  }
}

export function getAlldevice(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_DEVICE,
    })
    try{
      const options = {
        url: "/iot/pc/device/co/index",
        method: "get",
        data: {
          ...params
        }
      }

      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_DEVICE,
        allDevice: data
      })
    }catch(err){
      console.log(err, `color: ${log_color}`)
      dispatch({
        type: END_LOADING_DEVICE,
      })
    }

  }
}