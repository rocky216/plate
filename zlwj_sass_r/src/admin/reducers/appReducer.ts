import {getToken, OpenNotification} from "@public/utils"

let initialState = {
  spinning: false,
  token: getToken(),
  OpenNotification,
  
}

const appReducer = (state=initialState, action: any)=>{
  switch(action.type){
    default:
      return state;
  }
}

export default appReducer;