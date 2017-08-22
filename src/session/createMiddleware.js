export default (performLogin, performLogout, actions, options) => store => next => action => {
  const session = store.getState()[options.storeKey]

  // LOGIN
  const login = () => {
    const user = action.payload

    loginInit()
    performLogin(user)
      .then((user) => loginSuccess(user))
      .catch((error) => loginError(error))
  }

  const loginInit = () => {
    next(actions.loginInit())
  }

  const loginError = (error) => {
    next(actions.loginError(error))
  }

  const loginSuccess = (user) => {
    next(actions.loginSuccess(user))

    if (options.redirectAfterLogin) {
      let redirect =
        (options.dynamicRedirect && session.redirect) ||
        options.redirectAfterLogin

      if (typeof redirect === 'string') redirect = [redirect]

      console.log(redirect)

      next(actions.changeRoute(...redirect))
    }
  }

  // LOGOUT
  const logout = () => {
    logoutInit()
    performLogout(session.user)
      .then(() => logoutSuccess())
      .catch((error) => logoutError(error))
  }

  const logoutInit = () => {
    next(actions.logoutInit())
  }

  const logoutError = (error) => {
    next(actions.logoutError(error))
  }

  const logoutSuccess = () => {
    next(actions.logoutSuccess())

    if (options.redirectAfterLogout) {
      let redirect = options.redirectAfterLogout

      if (typeof redirect === 'string') redirect = [redirect]

      next(actions.changeRoute(...redirect))
    }
  }

  // ACCESS CONTROL
  const accessControl = () => {
    const nextRoute = action.payload

    // instant logout
    if (options.instantLogout && nextRoute.id === 'logout') return logout()

    // access allowed
    if (
      nextRoute.id === 'login' ||
      // nextRoute.id === 'logout' ||
      nextRoute.roles.includes(session.user.role)
    ) return next(action)

    // default: access denied: redirect to login
    next(actions.changeRoute(
      'login',
      null,
      [nextRoute.id, nextRoute.keys, nextRoute.redirect],
    ))
  }

  // LISTEN TO ACTIONS
  if (action.type === options.CHANGE_ROUTE) accessControl()
  else if (action.type === options.LOGIN) login()
  else if (action.type === options.LOGOUT) logout() // and logged in
  else next(action)
}
