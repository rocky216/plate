import {START_LOADING_DICT, END_LOADING_DICT } from "@/types"
import {log_color} from "@/utils/config"
import {fetch} from "@/utils"



export function editArguments(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_DICT,
    })
    try{
      const options = {
        url: "/iot/pc/callback/param/"+params.id,
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

export function addArguments(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_DICT,
    })
    try{
      const options = {
        url: "/iot/pc/callback/param/",
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


export function getArguments(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_DICT,
    })
    try{
      const options = {
        url: "/iot/pc/callback/param/index",
        method: "get",
        data: {
          ...params
        }
      }

      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_DICT,
        arguments: data
      })
    }catch(err){
      console.log(err, `color: ${log_color}`)
      dispatch({
        type: END_LOADING_DICT,
      })
    }

  }
}

export function deleteAlign(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_DICT,
    })
    try{
      const options = {
        url: "/iot/pc/queues/delete/"+params.id,
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


export function editApi(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_DICT,
    })
    try{
      const options = {
        url: "/iot/pc/request/api/"+params.id,
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

export function addApi(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_DICT,
    })
    try{
      const options = {
        url: "/iot/pc/request/api/",
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

export function getApiList(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_DICT,
    })
    try{
      const options = {
        url: "/iot/pc/request/api/index",
        method: "get",
        data: {
          ...params
        }
      }

      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_DICT,
        api: data
      })
    }catch(err){
      console.log(err, `color: ${log_color}`)
      dispatch({
        type: END_LOADING_DICT,
      })
    }

  }
}

export function deleteSwitch(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_DICT,
    })
    try{
      const options = {
        url: "/iot/pc/exchanges/delete/"+params.id,
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

export function editSwitch(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_DICT,
    })
    try{
      const options = {
        url: "/iot/pc/exchanges/"+params.id,
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

export function addSwitch(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_DICT,
    })
    try{
      const options = {
        url: "/iot/pc/exchanges/",
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

export function getSwitch(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_DICT,
    })
    try{
      const options = {
        url: "/iot/pc/exchanges/index/page",
        method: "get",
        data: {
          ...params
        }
      }

      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_DICT,
        switch: data
      })
    }catch(err){
      console.log(err, `color: ${log_color}`)
      dispatch({
        type: END_LOADING_DICT,
      })
    }

  }
}

export function addQueues(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_DICT,
    })
    try{
      const options = {
        url: "/iot/pc/queues/",
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


export function getQueues(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_DICT,
    })
    try{
      const options = {
        url: "/iot/pc/queues/index/page",
        method: "get",
        data: {
          ...params
        }
      }

      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_DICT,
        queues: data
      })
    }catch(err){
      console.log(err, `color: ${log_color}`)
      dispatch({
        type: END_LOADING_DICT,
      })
    }

  }
}


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


export function deleteDictDevice(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_DICT,
    })
    try{
      const options = {
        url: "/iot/pc/device/dict/delete/"+params.id,
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