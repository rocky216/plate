import {combineReducers} from "redux"
import appReducer from "./appReducer"
import powerReducer from "./powerReducer"
import sellReducer from "./sellReducer"


export default  combineReducers({
  app: appReducer,
  power: powerReducer,
  sell: sellReducer
})

