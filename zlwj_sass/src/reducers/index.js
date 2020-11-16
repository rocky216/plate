import {combineReducers} from "redux"
import appReducer from "./appReducer"
import systemReducer from "./systemReducer"
import baseReducer from "./baseReducer"
import projectReducer from "./projectReducer"
import financeReducer from "./financeReducer"
import otherReducer from "./otherReducer"
import manageReducer from "./manageReducer"
import dailyReducer from "./dailyReducer"
import centerReducer from "./centerReducer"


export default combineReducers({
  app: appReducer,
  system: systemReducer,
  base: baseReducer,
  project: projectReducer,
  finance: financeReducer,
  other: otherReducer,
  manage: manageReducer,
  daily: dailyReducer,
  center: centerReducer,
})