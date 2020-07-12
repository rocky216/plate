import { START_LOADING_SELL , END_LOADING_SELL} from "@/types"


let initialState = {
  spinning: false
}

function sellReducer (state=initialState, action:any){
  
  switch (action.type){
    case START_LOADING_SELL:
      return  Object.assign({},state, action, {spinning: true})
    case END_LOADING_SELL:
        return  Object.assign({},state, action, {spinning: false})
    default:
      return state
  }
}

export default sellReducer