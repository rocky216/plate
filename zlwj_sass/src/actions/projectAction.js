import {START_LOADING_PROJECT, END_LOADING_PROJECT} from "@/types"
import {fetch } from "@/utils"
import {log_color} from "@/utils/config"



export function deleteHeHousingEstate(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_PROJECT
    })
    try{
      const options = {
        url: "/api/pc/heHousingEstate/delete",
        method: "post",
        data: {...params}
      }

      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_PROJECT
      })

    }catch(err){
      console.log(err, `color: ${log_color}`)
      dispatch({
        type: END_LOADING_PROJECT
      })
    }

  }
}

export function editHeHousingEstate(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_PROJECT
    })
    try{
      const options = {
        url: "/api/pc/heHousingEstate/update",
        method: "post",
        data: {...params}
      }

      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_PROJECT
      })

    }catch(err){
      console.log(err, `color: ${log_color}`)
      dispatch({
        type: END_LOADING_PROJECT
      })
    }

  }
}

export function addHeHousingEstate(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_PROJECT
    })
    try{
      const options = {
        url: "/api/pc/heHousingEstate/add",
        method: "post",
        data: {...params}
      }

      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_PROJECT
      })

    }catch(err){
      console.log(err, `color: ${log_color}`)
      dispatch({
        type: END_LOADING_PROJECT
      })
    }

  }
}

export function getHeHousingEstate(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_PROJECT
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
        type: END_LOADING_PROJECT,
        projectitem: data
      })

    }catch(err){
      console.log(err, `color: ${log_color}`)
      dispatch({
        type: END_LOADING_PROJECT
      })
    }

  }
}