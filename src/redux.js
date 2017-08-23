import {applyMiddleware, createStore} from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension'

import reducers from './reducers/'
import {routerEnhancer} from './router.js'
import {sessionMiddleware} from './session.js'

const logErrors = store => next => action => {
  if (action.error) {
    const error = action.payload
    console.log(error instanceof Error)
    console.log(error.name, error.httpStatus)
    console.error(error)
  }

  next(action)
}

const middleware = [sessionMiddleware, logErrors]

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
