import {COMPANY_LOADING_START, COMPANY_LOADING_END} from "@admin/constant/company"

let initialState = {
  spinning: false,
  
}

const companyReducer = (state=initialState, action: any)=>{
  switch(action.type){
    case COMPANY_LOADING_START:
      return Object.assign({}, state, action, {spinning: true})
    case COMPANY_LOADING_END:
      return Object.assign({}, state, action, {spinning: false})
    default:
      return state;
  }
}

export default companyReducer;