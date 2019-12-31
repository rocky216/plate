import {combineReducers} from "redux"
import appReducer from "./appReducer"
import systemReducer from "./systemReducer"
import personReducer from "./personReducer"

export default combineReducers({
  app: appReducer,
  system: systemReducer,
  person: personReducer
})