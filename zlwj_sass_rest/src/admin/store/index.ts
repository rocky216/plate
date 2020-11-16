import {createStore, applyMiddleware} from "redux"
import reduxThunk from "redux-thunk"
import rootReducer from "@admin/reducers"



export default createStore(
  rootReducer,
  applyMiddleware(reduxThunk)
)