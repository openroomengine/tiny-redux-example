import {applyMiddleware, createStore} from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension'

import reducers from './reducers/'
import {routerEnhancer} from './router.js'
import {sessionMiddleware, sessionActions} from './session.js'

const logErrors = store => next => async action => {
  if (action.error) {
    const error = action.payload

    console.error(error)
    const body = await error.response.json()

    console.log(body)
  }

  if (action.type === 'LOGOUT_ERROR' && action.payload.name === 'ServerError' && action.payload.response.status === 401) {
    store.dispatch(sessionActions.destroySession())
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
