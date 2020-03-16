import {START_LOADING_DICT, END_LOADING_DICT} from "@/types"

let initialState = {
  spinning: false
}


export default function (state=initialState, action){
  
  switch (action.type){
    case "START_LOADING_DICT":
      return  Object.assign({},state, action, {spinning: true})
    case "END_LOADING_DICT":
        return  Object.assign({},state, action, {spinning: false})
    default:
      return state
  }
}