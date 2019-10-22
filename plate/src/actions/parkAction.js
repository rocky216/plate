import {fetch, getHouseInfo} from "@/utils"
import {LOADING_PARK_START, LOADING_PARK_END} from "@/types"

export function passList(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: LOADING_PARK_START
    })
    try {
      const options = {
        url: "/plateRecord/plateRecordList",
        method: "get",
        data: {
          ...params,
          itemId: getHouseInfo()
        }
      }
      let data = await fetch(options) 
      dispatch({
        type: LOADING_PARK_END,
        passList: data
      })
      if(next)next(data)
    }catch(err){
      console.log(err)
      dispatch({
        type: LOADING_PARK_END,
      })
    }
  }
}

export function deviceList(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: LOADING_PARK_START
    })
    try {
      const options = {
        url: "/device/list",
        method: "get",
        data: {
          ...params,
          itemId: getHouseInfo()
        }
      }
      let data = await fetch(options) 
      dispatch({
        type: LOADING_PARK_END,
        deviceList: data
      })
      if(next)next(data)
    }catch(err){
      console.log(err)
      dispatch({
        type: LOADING_PARK_END,
      })
    }
  }
}

export function leaseList(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: LOADING_PARK_START
    })
    try {
      const options = {
        url: "/lease/list",
        method: "get",
        data: {
          ...params,
          itemId: getHouseInfo()
        }
      }
      let data = await fetch(options) 
      dispatch({
        type: LOADING_PARK_END,
        leaseList: data
      })
      if(next)next(data)
    }catch(err){
      console.log(err)
      dispatch({
        type: LOADING_PARK_END,
      })
    }
  }
}


export function parkOrderList(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: LOADING_PARK_START
    })
    try {
      const options = {
        url: "/order/list",
        method: "get",
        data: {
          ...params,
          itemId: getHouseInfo()
        }
      }
      let data = await fetch(options) 
      dispatch({
        type: LOADING_PARK_END,
        parkOrderList: data
      })
      if(next)next(data)
    }catch(err){
      console.log(err)
      dispatch({
        type: LOADING_PARK_END,
      })
    }
  }
}

export function delPlateConfig(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: LOADING_PARK_START
    })
    try {
      const options = {
        url: "/plateConfig/delPlateConfig",
        method: "delete",
        data: {
          ...params
        }
      }
      let data = await fetch(options) 
      dispatch({
        type: LOADING_PARK_END,
      })
      if(next)next(data)
    }catch(err){
      console.log(err)
      dispatch({
        type: LOADING_PARK_END,
      })
    }
  }
}

export function updatePlateConfig(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: LOADING_PARK_START
    })
    try {
      const options = {
        url: "/plateConfig/updatePlateConfig",
        method: "put",
        data: {
          ...params,
        }
      }
      let data = await fetch(options) 
      dispatch({
        type: LOADING_PARK_END,
      })
      if(next)next(data)
    }catch(err){
      console.log(err)
      dispatch({
        type: LOADING_PARK_END,
      })
    }
  }
}

export function addPlateConfig(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: LOADING_PARK_START
    })
    try {
      const options = {
        url: "/plateConfig/addPlateConfig",
        method: "post",
        data: {
          ...params,
          itemId: getHouseInfo()
        }
      }
      let data = await fetch(options) 
      dispatch({
        type: LOADING_PARK_END,
      })
      if(next)next(data)
    }catch(err){
      console.log(err)
      dispatch({
        type: LOADING_PARK_END,
      })
    }
  }
}

export function getPlateConfigList(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: LOADING_PARK_START
    })
    try {
      const options = {
        url: "/plateConfig/plateConfigList",
        method: "get",
        data: {
          itemId: getHouseInfo()
        }
      }
      let data = await fetch(options) 
      dispatch({
        type: LOADING_PARK_END,
        plateConfList: data
      })
      if(next)next(data)
    }catch(err){
      console.log(err)
      dispatch({
        type: LOADING_PARK_END,
      })
    }
  }
}

export function delParking(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: LOADING_PARK_START
    })
    try {
      const options = {
        url: "/parking/delParking",
        method: "delete",
        data: params
      }
      let data = await fetch(options) 
      dispatch({
        type: LOADING_PARK_END,
      })
      if(next)next(data)
    }catch(err){
      console.log(err)
      dispatch({
        type: LOADING_PARK_END,
      })
    }
  }
}

export function updateParking(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: LOADING_PARK_START
    })
    try {
      const options = {
        url: "/parking/updateParking",
        method: "post",
        data: params
      }
      let data = await fetch(options) 
      dispatch({
        type: LOADING_PARK_END,
      })
      if(next)next(data)
    }catch(err){
      console.log(err)
      dispatch({
        type: LOADING_PARK_END,
      })
    }
  }
}

export function addParking(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: LOADING_PARK_START
    })
    try {
      const options = {
        url: "/parking/addParking",
        method: "formdata",
        data: params
      }
      let data = await fetch(options) 
      dispatch({
        type: LOADING_PARK_END,
      })
      if(next)next(data)
    }catch(err){
      console.log(err)
      dispatch({
        type: LOADING_PARK_END,
      })
    }
  }
}

export function getParkingList(params, next){
  
  return async function(dispatch, getState){
    dispatch({
      type: LOADING_PARK_START
    })
    try {
      const options = {
        url: "/parking/parkingList",
        method: "get",
        data: {
          itemId: getHouseInfo(),
          ...params
        }
      }
      let data = await fetch(options) 
      dispatch({
        type: LOADING_PARK_END,
        palteList: data
      })
      if(next)next(data)
    }catch(err){
      console.log(err)
      dispatch({
        type: LOADING_PARK_END,
      })
    }
  }
}

export function delLeaseConfig(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: LOADING_PARK_START
    })
    try {
      const options = {
        url: "/plateLeaseConfig/delLeaseConfig",
        method: "delete",
        data: params
      }
      let data = await fetch(options) 
      dispatch({
        type: LOADING_PARK_END,
      })
      if(next)next(data)
    }catch(err){
      console.log(err)
      dispatch({
        type: LOADING_PARK_END,
      })
    }
  }
}

export function addLeaseConfig(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: LOADING_PARK_START
    })
    try {
      const options = {
        url: "/plateLeaseConfig/addLeaseConfig",
        method: "post",
        data: params
      }
      let data = await fetch(options) 
      dispatch({
        type: LOADING_PARK_END,
      })
      if(next)next(data)
    }catch(err){
      console.log(err)
      dispatch({
        type: LOADING_PARK_END,
      })
    }
  }
}

export function getLeaseConfigList(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: LOADING_PARK_START
    })

    try {
      const options = {
        url: "/plateLeaseConfig/leaseConfigList",
        method: "get",
        data: {
          itemId: getHouseInfo()
        }
      }
      let data = await fetch(options) 
      dispatch({
        type: LOADING_PARK_END,
        parkRuleList: data
      })
      if(next)next(data)
    }catch(err){
      console.log(err)
      dispatch({
        type: LOADING_PARK_END,
      })
    }
  }
}