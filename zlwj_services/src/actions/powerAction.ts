import { START_LOADING_POWER, END_LOADING_POWER } from "@/types"
import {fetch } from "@/utils"

export function addEstates(params:any, next: (arg0: any) => void){
  return async function(dispatch:any, getState:any){
    dispatch({
      type: START_LOADING_POWER,
    })
    try{
      const options = {
        url: "/iot/power/item/",
        method: "post",
        data: {
          ...params
        }
      }

      let data:any = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_POWER,
      })
    }catch(err){
      console.log(err, `color: red`)
      dispatch({
        type: END_LOADING_POWER,
      })
    }

  }
}


export function getEstates(params:any, next: (arg0: any) => void){
  return async function(dispatch:any, getState:any){
    dispatch({
      type: START_LOADING_POWER,
    })
    try{
      const options = {
        url: "/iot/power/item/index",
        method: "get",
        data: {
          ...params
        }
      }

      let data:any = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_POWER,
        estate: data
      })
    }catch(err){
      console.log(err, `color: red`)
      dispatch({
        type: END_LOADING_POWER,
      })
    }

  }
}

export function deleteCompany(params:any, next: (arg0: any) => void){
  return async function(dispatch:any, getState:any){
    dispatch({
      type: START_LOADING_POWER,
    })
    try{
      const options = {
        url: "/iot/power/company/delete/"+params.id,
        method: "post",
        data: {
          ...params
        }
      }

      let data:any = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_POWER,
      })
    }catch(err){
      console.log(err, `color: red`)
      dispatch({
        type: END_LOADING_POWER,
      })
    }

  }
}

export function editCompany(params:any, next: (arg0: any) => void){
  return async function(dispatch:any, getState:any){
    dispatch({
      type: START_LOADING_POWER,
    })
    try{
      const options = {
        url: "/iot/power/company/update/"+params.id,
        method: "post",
        data: {
          ...params
        }
      }

      let data:any = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_POWER,
      })
    }catch(err){
      console.log(err, `color: red`)
      dispatch({
        type: END_LOADING_POWER,
      })
    }

  }
}

export function addCompany(params:any, next: (arg0: any) => void){
  return async function(dispatch:any, getState:any){
    dispatch({
      type: START_LOADING_POWER,
    })
    try{
      const options = {
        url: "/iot/power/company/",
        method: "post",
        data: {
          ...params
        }
      }

      let data:any = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_POWER,
      })
    }catch(err){
      console.log(err, `color: red`)
      dispatch({
        type: END_LOADING_POWER,
      })
    }

  }
}

export function getCompanys(params:any, next: (arg0: any) => void){
  return async function(dispatch:any, getState:any){
    dispatch({
      type: START_LOADING_POWER,
    })
    try{
      const options = {
        url: "/iot/power/company/index/page",
        method: "get",
        data: {
          ...params
        }
      }

      let data:any = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_POWER,
        companys: data
      })
    }catch(err){
      console.log(err, `color: red`)
      dispatch({
        type: END_LOADING_POWER,
      })
    }

  }
}