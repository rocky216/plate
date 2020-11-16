import {combineReducers} from "redux"
import appReducer from "./appReducer"
import companyReducer from "./companyReducer"



export default combineReducers({
  app: appReducer,
  company: companyReducer
})