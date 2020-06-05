import {combineReducers} from "redux"
import appReducer from "./appReducer"
import powerReducer from "./powerReducer"


export default  combineReducers({
  app: appReducer,
  power: powerReducer
})

