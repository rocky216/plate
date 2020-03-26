import {START_LOADING_DEVICE, END_LOADING_DEVICE} from "@/types"

let initialState = {
  spinning: false
}


export default function (state=initialState, action){
  
  switch (action.type){
    case START_LOADING_DEVICE:
      return  Object.assign({},state, action, {spinning: true})
    case END_LOADING_DEVICE:
        return  Object.assign({},state, action, {spinning: false})
    default:
      return state
  }
}