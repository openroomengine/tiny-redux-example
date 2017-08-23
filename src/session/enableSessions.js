import createMiddleware from './createMiddleware.js'
import createReducer from './createReducer.js'
import createActions from './createActions.js'

const defaults = {
  storeKey: 'session',
  redirectUnauthorized: true,
  redirectAfterLogin: 'home', // false, string, object
  dynamicRedirect: true, // after successful login, should previous route be activated again?
  redirectAfterLogout: 'login', // false, string, object
  instantLogout: true,
  defaultUser: {
    role: 'visitor', // mandatory
  },

  // action types
  LOGIN: 'LOGIN',
  LOGIN_INIT: 'LOGIN_INIT',
  LOGIN_ERROR: 'LOGIN_ERROR',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGOUT: 'LOGOUT',
  LOGOUT_INIT: 'LOGOUT_INIT',
  LOGOUT_ERROR: 'LOGOUT_ERROR',
  LOGOUT_SUCCESS: 'LOGOUT_SUCCESS',
}

export default (performLogin, performLogout, changeRoute, options) => {
  options = {...defaults, ...options}

  // extract changeRoute type
  if (!options.CHANGE_ROUTE) options.CHANGE_ROUTE = changeRoute().type

  const actions = createActions(changeRoute, options)

  return {
    sessionMiddleware: createMiddleware(performLogin, performLogout, actions, options),
    sessionReducer: createReducer(options),
    sessionActions: actions,
  }
}
