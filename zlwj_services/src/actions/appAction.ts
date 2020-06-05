import {START_LOADING_APP, END_LOADING_APP} from "@/types"
import {fetch, setToken} from "@/utils"




export function goLogin(params:any, next: (arg0: any) => void){
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

      let data:any = await fetch(options)
      if(next)next(data)
      setToken( data )
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