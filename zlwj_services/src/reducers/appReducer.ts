import { START_LOADING_APP, END_LOADING_APP} from "@/types"
import {
  OpenNotification,
  addIndex,
  normFileSingle,
  normFileMulti,
  submitFiles,
  Pagination
} from "@/utils"

let initialState = {
  spinning: false,
  mytype: (window as any).mytype,
  utils: {
    OpenNotification,
    addIndex,
    normFileSingle,
    normFileMulti,
    submitFiles,
    Pagination
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