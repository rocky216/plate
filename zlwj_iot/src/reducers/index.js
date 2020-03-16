import {combineReducers} from "redux"
import appReducer from "./appReducer"
import companyReducer from "./companyReducer"
import dictReducer from "./dictReducer"

export default combineReducers({
  app: appReducer,
  company: companyReducer,
  dict: dictReducer
})