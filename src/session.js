import enableSessions from './session/'
import {changeRoute} from './router.js'

const performLogin = async (user) => { // user from LOGIN action.payload
  // promise returns object that should be stored as user state
  return user
}

const performLogout = async (user) => { // user from state
  // session does not care about value of fulfilled promise
}

const options = {
  redirectAfterLogin: 'dashboard',
  // instantLogout: false,
}

const {
  sessionMiddleware,
  sessionReducer,
  sessionActions,
} = enableSessions(performLogin, performLogout, changeRoute, options)

export {
  sessionMiddleware,
  sessionReducer,
  sessionActions,
}
