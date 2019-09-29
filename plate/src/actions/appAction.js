import {fetch, getHouseInfo, getUserInfo} from "@/utils"
import {LOADING_DATA_START, LOADING_DATA_END} from "@/types"

export function login(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: LOADING_DATA_START
    })
    try {
      const options = {
        url: "/common/loginPwd",
        method: "post",
        data: params
      }
      let data = await fetch(options) 
      localStorage.setItem("userInfo",JSON.stringify(data.account))
      localStorage.setItem("token",data.account.token)
      dispatch({
        type: LOADING_DATA_END,
        toke: data.account.token,
        items: data.items
      })
      if(next)next(data)
    }catch(err){
      console.log(err)
    }
  }
}

export function getHouse(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: LOADING_DATA_START
    })
    try {
      dispatch({
        type: LOADING_DATA_END,
        houseInfo: params
      })
      localStorage.setItem("houseInfo", JSON.stringify(params))
      if(next)next(data)
    }catch(err){
      console.log(err)
    }
  }
}


export function getItemByAccount(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: LOADING_DATA_START
    })
    try {
      const options = {
        url: "/sysAccount/getItemByAccount",
        method: "get",
        data: {
          accountId: getUserInfo()
        }
      }
      let data = await fetch(options) 
      dispatch({
        type: LOADING_DATA_END,
        mySysItemList:data
      })
      if(next)next(data)
    }catch(err){
      console.log(err)
    }
  }
}

export function getMeunByAccountId(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: LOADING_DATA_START
    })
    
    try {
      const options = {
        url: "/sysAccount/getMeunByAccountId",
        method: "get",
        data: {
          accountId: getUserInfo()
        }
      }
      let data = await fetch(options) 
      dispatch({
        type: LOADING_DATA_END,
        meunList: data
      })
      if(next)next(data)
    }catch(err){
      console.log(err)
    }
  }
}

