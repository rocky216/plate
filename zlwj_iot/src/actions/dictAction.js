import {START_LOADING_DICT, END_LOADING_DICT } from "@/types"
import {log_color} from "@/utils/config"
import {fetch} from "@/utils"


export function editDictDevice(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_DICT,
    })
    try{
      const options = {
        url: "/iot/pc/device/dict/"+params.id,
        method: "put",
        data: {
          ...params
        }
      }

      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_DICT,
      })
    }catch(err){
      console.log(err, `color: ${log_color}`)
      dispatch({
        type: END_LOADING_DICT,
      })
    }

  }
}

export function addDictDevice(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_DICT,
    })
    try{
      const options = {
        url: "/iot/pc/device/dict/",
        method: "post",
        data: {
          ...params
        }
      }

      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_DICT,
      })
    }catch(err){
      console.log(err, `color: ${log_color}`)
      dispatch({
        type: END_LOADING_DICT,
      })
    }

  }
}

export function getDeviceDictTree(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_DICT,
    })
    try{
      const options = {
        url: "/iot/pc/device/dict/getDeviceDictTree",
        method: "get",
        data: {
          ...params
        }
      }

      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_DICT,
        dictdevice: data
      })
    }catch(err){
      console.log(err, `color: ${log_color}`)
      dispatch({
        type: END_LOADING_DICT,
      })
    }

  }
}