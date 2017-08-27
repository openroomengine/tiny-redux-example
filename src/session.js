import enableSessions, {ServerError} from './session/'
import {changeRoute} from './router.js'

const performLogin = async (user) => {
  const options = {
    method: 'POST',
    headers: new Headers({
      'Content-Type': 'application/json',
    }),
    credentials: 'include',
    body: JSON.stringify({
      username: user.username,
      password: user.password,
    }),
  }

  const res = await fetch('http://localhost:8080/login', options)

  // throw if login did not successfully complete
  if (res.status !== 200) throw new ServerError(res)

  // don't keep sensitive info in store
  delete user.password

  // stored under session.user
  return user
}

const performLogout = async (user) => {
  const options = {
    method: 'POST',
    headers: new Headers({
      'Content-Type': 'application/json',
    }),
    credentials: 'include',
  }

  const res = await fetch('http://localhost:8080/logout', options)

  // throw if logout did not successfully complete
  if (res.status !== 200) throw new ServerError(res)
}

const options = {
  redirectAfterLogin: 'dashboard',
  defaultUser: {
    username: null,
  },
}

const {
  sessionMiddleware,
  sessionReducer,
  sessionActions,
  authorize,
  Authorize,
} = enableSessions(performLogin, performLogout, changeRoute, options)

export {
  sessionMiddleware,
  sessionReducer,
  sessionActions,
  authorize,
  Authorize,
}
