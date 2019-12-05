import {START_LOADING_FINANCE, END_LOADING_FINANCE} from "@/types"

let initialState = {
  spinning: false,
}


export default function (state=initialState, action){
  
  switch (action.type){
    case START_LOADING_FINANCE:
      return  Object.assign({},state, action, {spinning: true})
    case END_LOADING_FINANCE:
        return  Object.assign({},state, action, {spinning: false})
    default:
      return state
  }
}