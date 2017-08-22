import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

import {sessionActions} from '../session.js'

import Link from '../styles/LinkStyle.jsx'

const mapStateToProps = (state) => ({
  route: state.route.current.id,
})

@connect(mapStateToProps)
export default class AppContainer extends React.Component {
  render () {
    const {route, dispatch} = this.props

    let page = null

    switch (route) {
      case 'login': {
        page = <div onClick={(e) => dispatch(sessionActions.login({role: 'admin'}))}>login</div>
        break
      }

      case 'logout': {
        page = <div onClick={(e) => dispatch(sessionActions.logout())}>logout</div>
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
    }

    return (
      <div>
        <ul>
          <li><Link to="login">login</Link></li>
          <li><Link to="dashboard">dashboard</Link></li>
          <li><Link to="rooms">rooms</Link></li>
          <li><Link to="room" room="1">room 1</Link></li>
          <li><Link to="logout">logout</Link></li>
        </ul>
        <div style={{border: '1px solid black'}}>
          {page}
        </div>
      </div>
    )
  }

  static propTypes = {
    path: PropTypes.string,
  }
}
