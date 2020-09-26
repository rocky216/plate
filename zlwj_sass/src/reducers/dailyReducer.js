import {START_LOADING_DAILY, END_LOADING_DAILY} from "@/types"

let initialState = {
  spinning: false,
}


export default function (state=initialState, action){
  
  switch (action.type){
    case START_LOADING_DAILY:
      return  Object.assign({},state, action, {spinning: true})
    case END_LOADING_DAILY:
        return  Object.assign({},state, action, {spinning: false})
    default:
      return state
  }
}