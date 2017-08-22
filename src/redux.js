import {applyMiddleware, createStore} from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension'

import reducers from './reducers/'
import {routerEnhancer} from './router.js'
import {sessionMiddleware} from './session.js'

const middleware = [sessionMiddleware]

const store = createStore(
  reducers,
  composeWithDevTools(
    routerEnhancer,
    applyMiddleware(...middleware),
  )
)

const dispatch = store.dispatch
const getState = store.getState

export {
  store,
  dispatch,
  getState,
}
