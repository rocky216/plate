import {combineReducers} from "redux"
import appReducer from "./appReducer"
import systemReducer from "./systemReducer"
import baseReducer from "./baseReducer"
import projectReducer from "./projectReducer"

export default combineReducers({
  app: appReducer,
  system: systemReducer,
  base: baseReducer,
  project: projectReducer
})