import enableRouter from './router/'

import {CHANGE_ROUTE} from './actions/actionTypes.js'

// routes
const routeDefs = {
  login: '/login',
  logout: '/logout',
  dashboard: '/',
  rooms: '/rooms',
  room: '/rooms/:room',
  roomBooking: '/rooms/:room/bookings/:booking?',
}

// router options
const options = {
  CHANGE_ROUTE: CHANGE_ROUTE,
  defaultRouteValues: {
    roles: ['admin'],
  },
}

// create router
const {
  routerReducer,
  routerEnhancer,
  routes,
  changeRoute,
  link,
} = enableRouter(routeDefs, options)

export {
  routerReducer,
  routerEnhancer,
  routes,
  changeRoute,
  link,
}
