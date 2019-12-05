import {START_LOADING_OTHER, END_LOADING_OTHER} from "@/types"
import {fetch } from "@/utils"
import {log_color} from "@/utils/config"

export function addTheme(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_OTHER,
    })
    try{
      const options = {
        url: "/api/pc/vote/theme/add",
        method: "post",
        data: {
          ...params
        }
      }

      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_OTHER,
      })
    }catch(err){
      console.log(err, `color: ${log_color}`)
      dispatch({
        type: END_LOADING_OTHER,
      })
    }

  }
}

export function getThemeList(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_OTHER,
    })
    try{
      const options = {
        url: "/api/pc/vote/theme/listPage",
        method: "get",
        data: {
          ...params
        }
      }

      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_OTHER,
        theme: data
      })
    }catch(err){
      console.log(err, `color: ${log_color}`)
      dispatch({
        type: END_LOADING_OTHER,
      })
    }

  }
}