import {START_LOADING_APP, END_LOADING_APP} from "@/types"
import {fetch} from "@/utils"
import { Store } from "redux"



export function goLogin(params:any, next:any){
  return async function(dispatch:any, getState:any){
    dispatch({
      type: START_LOADING_APP,
    })
    try{
      const options = {
        url: `/iot${(window as any).mytype}/account/login`,
        method: "post",
        data: {
          ...params
        }
      }

      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_APP,
      })
    }catch(err){
      console.log(err, `color: red`)
      dispatch({
        type: END_LOADING_APP,
      })
    }

  }
}