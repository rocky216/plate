import {START_LOADING_PERSON, END_LOADING_PERSON} from "@/types"

let initialState = {
  spinning: false,
}


export default function (state=initialState, action){
  switch (action.type){
    case START_LOADING_PERSON:
      return  Object.assign({},state, action, {spinning: true})
    case END_LOADING_PERSON:
        return  Object.assign({},state, action, {spinning: false})
    default:
      return state
  }
}