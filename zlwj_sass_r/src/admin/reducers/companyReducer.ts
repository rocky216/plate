import {COMPANY_LOADING_START, COMPANY_LOADING_END, COMPANY_LOADING_NOT} from "@admin/constant/company"

let initialState = {
  spinning: false,
  
}

const companyReducer = (state=initialState, action: any)=>{
  switch(action.type){
    case COMPANY_LOADING_START:
      return Object.assign({}, state, action, {spinning: true})
    case COMPANY_LOADING_END:
      return Object.assign({}, state, action, {spinning: false})
    case COMPANY_LOADING_NOT:
      console.log(12)
      return Object.assign({}, state, action)
    default:
      return state;
  }
}

export default companyReducer;