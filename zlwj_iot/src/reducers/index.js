import {combineReducers} from "redux"
import appReducer from "./appReducer"
import companyReducer from "./companyReducer"
import dictReducer from "./dictReducer"
import deviceReducer from "./deviceReducer"

export default combineReducers({
  app: appReducer,
  company: companyReducer,
  dict: dictReducer,
  device: deviceReducer
})