import { START_LOADING_APP, END_LOADING_APP} from "@/types"
import {
  OpenNotification,
  addIndex,
} from "@/utils"

let initialState = {
  spinning: false,
  utils: {
    OpenNotification,
    addIndex,
  }
}

function appReducer (state=initialState, action:any){
  
  switch (action.type){
    case START_LOADING_APP:
      return  Object.assign({},state, action, {spinning: true})
    case END_LOADING_APP:
        return  Object.assign({},state, action, {spinning: false})
    default:
      return state
  }
}

export default appReducer