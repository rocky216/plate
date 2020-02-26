import {
  START_LOADING_PERSON, 
  END_LOADING_PERSON, 
  START_LOADING_PERSON_ONE, 
  END_LOADING_PERSON_ONE,
  START_NOLOADING_PERSON,
  END_NOLOADING_PERSON
} from "@/types"

let initialState = {
  spinning: false,
}


export default function (state=initialState, action){
  switch (action.type){
    case START_LOADING_PERSON:
      return  Object.assign({},state, action, {spinning: true})
    case END_LOADING_PERSON:
        return  Object.assign({},state, action, {spinning: false})
    case START_LOADING_PERSON_ONE:
      return  Object.assign({},state, action, {spinning: true})
    case END_LOADING_PERSON_ONE:
        return  Object.assign({},state, action, {spinning: false})
    case END_NOLOADING_PERSON:
        return  Object.assign({},state, action)
    default:
      return state
  }
}