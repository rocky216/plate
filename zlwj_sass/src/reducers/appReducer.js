import {START_LOADING_APP, END_LOADING_APP} from "@/types"
import {OpenNotification, setCookie, getCookie, removeCookie} from "@/utils"

let initialState = {
  spinning: false,
  collapsed: false,
  utils: {
    OpenNotification,
    setCookie, 
    getCookie, 
    removeCookie
  },
  keeptabs: [{name: "首页", path: "/"}]
}


export default function (state=initialState, action){
  
  switch (action.type){
    case START_LOADING_APP:
      return  Object.assign({},state, action, {spinning: true})
    case END_LOADING_APP:
        return  Object.assign({},state, action, {spinning: false})
    default:
      return state
  }
}