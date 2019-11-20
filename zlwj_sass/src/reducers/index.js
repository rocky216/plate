import {combineReducers} from "redux"
import appReducer from "./appReducer"
import systemReducer from "./systemReducer"

export default combineReducers({
  app: appReducer,
  system: systemReducer
})