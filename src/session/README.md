# Tiny redux sessions

## API surface
- `enableSessions(performLogin, performLogout, changeRoute, options)`

### User

    {
      role: String,
      // whatever-you-want
    }

### performLogin
- in: User
- out: Promise
  - fulfill: User
  - reject: Error

### performLogout
- in: User
- out: Promise
  - fulfill: Void
  - reject: Error

### changeRoute
- action creator you get from tiny redux router
- in: id: String, keys: Object, redirect: Object
  - id: route id
  - keys: `:name` in route path
  - redirect: object with changeRoute arguments

### LOGIN action
- payload: User

### LOGIN_INIT action
- payload: Void

### LOGIN_ERROR action
- error: true
- payload: Error

### LOGIN_SUCCESS action
- payload: User (value from performLogin)

### LOGOUT action
- payload: Void

### LOGOUT_INIT action
- payload: Void

### LOGOUT_ERROR action
- error: true
- payload: Error

### LOGOUT_SUCCESS action
- payload: Void

## Notes
- sessionMiddleware should be placed after routerEnhancer in order to catch all events
- access control does not apply to login and logout routes
- `changeRoute('logout')` does never hit reducer, instead logout procedure is performed and user is redirected to `logoutRedirect` (default: `login`).
- best to wrap `sessionActions.login` in another function that provides an api for the keys you want to use on the user object.

## Middleware
                                         +- sessionMiddleware -+
    -- unrelated action ---------------> |                     | -- unrelated action ----->
    -- CHANGE_ROUTE x -----------------> | access allowed      | -- CHANGE_ROUTE x ------->
                                         | access denied       | -- CHANGE_ROUTE login --->
