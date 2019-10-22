import {LOADING_INTERNET_START, LOADING_INTERNET_END} from "@/types"
import {fetch, getHouseInfo} from "@/utils"

export function getInfoByItemId(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: LOADING_INTERNET_START
    })
    try {
      const options = {
        url: "/simboss/infoByItemId",
        method: "get",
        data: {
          ...params,
        }
      }
      let data = await fetch(options) 
      dispatch({
        type: LOADING_INTERNET_END,
      })
      if(next)next(data)
    }catch(err){
      console.log(err)
      dispatch({
        type: LOADING_INTERNET_END,
      })
    }
  }
}

export function getContrastInItem(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: LOADING_INTERNET_START
    })
    try {
      const options = {
        url: "/simboss/contrastInItem",
        method: "get",
        data: {
          ...params,
        }
      }
      let data = await fetch(options) 
      dispatch({
        type: LOADING_INTERNET_END,
      })
      if(next)next(data)
    }catch(err){
      console.log(err)
      dispatch({
        type: LOADING_INTERNET_END,
      })
    }
  }
}

export function setDistribute(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: LOADING_INTERNET_START
    })
    try {
      const options = {
        url: "/simboss/distribute",
        method: "get",
        data: {
          ...params
        }
      }
      let data = await fetch(options) 
      dispatch({
        type: LOADING_INTERNET_END,
      })
      if(next)next(data)
    }catch(err){
      console.log(err)
      dispatch({
        type: LOADING_INTERNET_END,
      })
    }
  }
}

export function getInternetInit(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: LOADING_INTERNET_START
    })
    try {
      const options = {
        url: "/simboss/init",
        method: "get",
        data: {
          ...params,
        }
      }
      let data = await fetch(options) 
      dispatch({
        type: LOADING_INTERNET_END,
      })
      if(next)next(data)
    }catch(err){
      console.log(err)
      dispatch({
        type: LOADING_INTERNET_END,
      })
    }
  }
}

export function getInfoByIccid(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: LOADING_INTERNET_START
    })
    try {
      const options = {
        url: "/simboss/infoByIccid",
        method: "get",
        data: {
          ...params,
        }
      }
      let data = await fetch(options) 
      getState().internet.internetList.simbossIccids[params._index]["info"] = data
      dispatch({
        type: LOADING_INTERNET_END,
        internetList: getState().internet.internetList
      })
      if(next)next(data)
    }catch(err){
      console.log(err)
      dispatch({
        type: LOADING_INTERNET_END,
      })
    }
  }
}

export function getInternetList(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: LOADING_INTERNET_START
    })
    try {
      const options = {
        url: "/simboss/iccidList",
        method: "get",
        data: {
          ...params,
        }
      }
      let data = await fetch(options) 
      dispatch({
        type: LOADING_INTERNET_END,
        internetList: data
      })
      if(next)next(data)
    }catch(err){
      console.log(err)
      dispatch({
        type: LOADING_INTERNET_END,
      })
    }
  }
}