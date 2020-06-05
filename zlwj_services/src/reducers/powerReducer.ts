import { START_LOADING_POWER , END_LOADING_POWER} from "@/types"


let initialState = {
  spinning: false
}

function powerReducer (state=initialState, action:any){
  
  switch (action.type){
    case START_LOADING_POWER:
      return  Object.assign({},state, action, {spinning: true})
    case END_LOADING_POWER:
        return  Object.assign({},state, action, {spinning: false})
    default:
      return state
  }
}

export default powerReducer