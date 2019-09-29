import {combineReducers} from "redux"
import appReducer from "./appReducer"
import projectReducer from "./projectReducer"
import parkReducer from "./parkReducer"

const reducers = combineReducers({
  app: appReducer,
  project: projectReducer,
  park: parkReducer
})

export default reducers