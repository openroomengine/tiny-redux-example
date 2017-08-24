export default (performLogin, performLogout, actions, options) => ({dispatch, getState}) => next => action => {
  const state = getState()
  const session = options.getSession(state)
  const currentRoute = options.getCurrentRoute(state)

  // ACCESS CONTROL
  const accessControl = () => {
    // on: CHANGE_ROUTE
    const nextRoute = action.payload

    // instant logout
    if (options.instantLogout && nextRoute.id === options.logoutRoute) {
      if (!options.swallowChangeRouteLogout) next(action)
      return dispatch(actions.logout())
    }

    // swallow CHANGE_ROUTE login when already logged in
    if (nextRoute.id === options.loginRoute && session.loggedIn) return

    // access allowed
    if (
      !options.redirectUnauthorized ||
      nextRoute.id === options.loginRoute ||
      nextRoute.roles.includes(session.user.role)
    ) return next(action)

    // default: access denied: redirect to login
    next(actions.changeRoute(
      options.loginRoute,
      null,
      {
        id: nextRoute.id,
        keys: nextRoute.keys,
        redirect: nextRoute.redirect,
      },
    ))
  }

  // LOGIN
  const login = () => {
    // swallow LOGIN when already logged in
    if (session.loggedIn) return

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

    // redirect after login
    if (options.redirectAfterLogin) {
      let redirect =
        (options.dynamicRedirect && currentRoute.redirect) ||
        options.redirectAfterLogin

      if (typeof redirect === 'string') redirect = {id: redirect}

      dispatch(actions.changeRoute(
        redirect.id,
        redirect.keys,
        redirect.redirect,
      ))
    }
  }

  // LOGOUT
  const logout = () => {
    // swallow LOGOUT when not logged in
    if (!session.loggedIn) return

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

    // redirect after logout
    if (options.redirectAfterLogout) {
      let redirect = options.redirectAfterLogout

      if (typeof redirect === 'string') redirect = {id: redirect}

      dispatch(actions.changeRoute(
        redirect.id,
        redirect.keys,
        redirect.redirect,
      ))
    }
  }

  // DESTROY SESSION
  const destroySession = () => {
    // swallow DESTROY_SESSION when not logged in
    if (!session.loggedIn) return

    next(action)

    // redirect after destroy session
    if (options.redirectAfterDestroySession) {
      let redirect = options.redirectAfterDestroySession

      if (typeof redirect === 'string') redirect = {id: redirect}

      // set current route as redirect
      if (
        !redirect.redirect &&
        options.userIdentifier &&
        options.rememberRouteBeforeDestroySession
      ) {
        redirect.redirect = {
          id: currentRoute.id,
          keys: currentRoute.keys,
          redirect: currentRoute.redirect,
        }
      }

      dispatch(actions.changeRoute(
        redirect.id,
        redirect.keys,
        redirect.redirect,
      ))
    }
  }

  // LISTEN TO ACTIONS
  if (action.type === options.CHANGE_ROUTE) accessControl()
  else if (action.type === options.LOGIN) login()
  else if (action.type === options.LOGOUT) logout()
  else if (action.type === options.DESTROY_SESSION) destroySession()
  else next(action)
}
