import {START_LOADING_BASE, END_LOADING_BASE} from "@/types"

let initialState = {
  spinning: false,
}


export default function (state=initialState, action){
  
  switch (action.type){
    case START_LOADING_BASE:
      return  Object.assign({},state, action, {spinning: true})
    case END_LOADING_BASE:
        return  Object.assign({},state, action, {spinning: false})
    default:
      return state
  }
}