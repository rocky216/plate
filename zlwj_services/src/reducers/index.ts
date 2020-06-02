let initialState = {
  spinning: false
}

function reducer (state=initialState, action:any){
  
  switch (action.type){
    case "START_LOADING_APP":
      return  Object.assign({},state, action, {spinning: true})
    case "END_LOADING_APP":
        return  Object.assign({},state, action, {spinning: false})
    default:
      return state
  }
}

export default reducer