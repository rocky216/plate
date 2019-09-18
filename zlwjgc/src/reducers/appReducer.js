import {APP_LOADING_DATA, APP_LOADING_START} from "@/actions/appAction"

let initState = {
  spinning: true,
}
export default function(state = initState, action){
  switch(action.type){
    case APP_LOADING_START:
      return Object.assign({}, state,action, {spinning: true})
    case APP_LOADING_DATA:
      return Object.assign({}, state,action, {spinning: false})
    default:
      return state
  }
}