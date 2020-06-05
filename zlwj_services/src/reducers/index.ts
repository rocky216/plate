import {combineReducers} from "redux"
import powerReducer from "./powerReducer"


export default  combineReducers({
  power: powerReducer
})

