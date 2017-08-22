import {combineReducers} from 'redux'
import {routerReducer} from '../router.js'
import {sessionReducer} from '../session.js'

export default combineReducers({
  route: routerReducer,
  session: sessionReducer,
})
