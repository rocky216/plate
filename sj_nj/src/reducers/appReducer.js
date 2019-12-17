import {START_LOADING_APP, END_LOADING_APP} from "@/types"

let initialState = {
  spinning: false,
  collapsed: false,
  keeptabs: [{name: "首页", path: "/"}]
}


export default function (state=initialState, action){
  
  switch (action.type){
    case "START_LOADING_APP":
      return  Object.assign({},state, action, {spinning: false})
    case "END_LOADING_APP":
        return  Object.assign({},state, action, {spinning: true})
    default:
      return state
  }
}