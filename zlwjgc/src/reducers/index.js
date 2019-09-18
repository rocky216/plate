import {combineReducers} from 'redux'
import appReducer from "@/reducers/appReducer"



const RootReducer = combineReducers({
  app: appReducer
})

export default RootReducer