import {applyMiddleware, createStore} from 'redux'
import reduxThunk from 'redux-thunk'
import reducers from '@/reducers'

global.stores = createStore(
  reducers,
  applyMiddleware(reduxThunk)
)

export default global.stores