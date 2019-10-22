import {combineReducers} from "redux"
import appReducer from "./appReducer"
import projectReducer from "./projectReducer"
import parkReducer from "./parkReducer"
import internetReducer from "./internetReducer"

const reducers = combineReducers({
  app: appReducer,
  project: projectReducer,
  park: parkReducer,
  internet: internetReducer
})

export default reducers