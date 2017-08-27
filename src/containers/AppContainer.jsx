import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

import {sessionActions, authorize, Authorize} from '../session.js'

import Link from '../styles/LinkStyle.jsx'

const mapStateToProps = (state) => ({
  route: state.route.current.id,
})

const mapDispatchToProps = (dispatch) => ({
  login: () => dispatch(sessionActions.login({
    role: 'admin',
    persist: 'session',
    username: 'b',
    password: 'b',
  })),
  logout: () => dispatch(sessionActions.logout()),
  destroySession: () => dispatch(sessionActions.destroySession()),
})

@connect(mapStateToProps, mapDispatchToProps)
export default class AppContainer extends React.Component {
  render () {
    const {route, login, logout, destroySession} = this.props

    let page = null

    switch (route) {
      case 'login': {
        page = <div onClick={(e) => login()}>login</div>
        break
      }

      case 'logout': {
        page = <div onClick={(e) => logout()}>logout</div>
        break
      }

      case 'dashboard': {
        page = <div>dashboard</div>
        break
      }

      case 'rooms': {
        page = <div>rooms</div>
        break
      }

      case 'room': {
        page = <div>room</div>
        break
      }
    }

    const Hello = ({children, ...rest}) => <div {...rest}>{children}</div>

    const Test = authorize('admin')(Hello)

    return (
      <div>
        <ul>
          <li><Link to="login">login</Link></li>
          <li><Link to="dashboard">dashboard</Link></li>
          <li><Link to="rooms">rooms</Link></li>
          <li><Link to="room" room="1">room 1</Link></li>
          <li><a href="#" onClick={(e) => destroySession()}>DESTROY_SESSION</a></li>
          <li><Link to="logout">logout</Link></li>
        </ul>
        <div style={{border: '1px solid black'}}>
          {page}
        </div>
        <div>
          <Authorize roles="admin">
            <div>ADMIN AREA 1</div>
          </Authorize>
          <Test>hihi</Test>
        </div>
      </div>
    )
  }

  static propTypes = {
    path: PropTypes.string,
  }
}
