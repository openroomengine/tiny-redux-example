export default (options) => {
  const initial = {
    loggedIn: false,
    loggingIn: false,
    loggingOut: false,
    redirect: null,
    user: options.defaultUser,
  }

  return (sessionState = initial, action) => {
    switch (action.type) {
      case options.LOGIN_INIT: {
        return {
          ...sessionState,
          loggingIn: true,
        }
      }

      case options.LOGIN_ERROR: {
        return {
          ...sessionState,
          loggingIn: false,
        }
      }

      case options.LOGIN_SUCCESS: {
        return {
          ...sessionState,
          loggedIn: true,
          loggingIn: false,
          user: action.payload,
        }
      }

      case options.LOGOUT_INIT: {
        return {
          ...sessionState,
          loggingOut: true,
        }
      }

      case options.LOGOUT_ERROR: {
        return {
          ...sessionState,
          loggingOut: false,
        }
      }

      case options.LOGOUT_SUCCESS: {
        return {
          ...sessionState,
          loggedIn: false,
          loggingOut: false,
          user: options.defaultUser,
        }
      }

      case options.CHANGE_ROUTE: {
        const {redirect} = action.payload

        return {
          ...sessionState,
          redirect,
        }
      }

      // case options.UNAUTHORIZED: {
      //   return {
      //     ...sessionState,
      //   }
      // }

      default: {
        return sessionState
      }
    }
  }
}
