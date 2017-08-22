import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import {link} from '../router.js'

const LinkStyle = ({children, className, style, active, nativeRef, ...rest}) =>
  <a
    {...rest}
    style={active ? {...style, color: 'black'} : style}
    className={classNames(active ? 'active' : null, className)}
    ref={nativeRef}
  >
    {children}
  </a>

LinkStyle.propTypes = {
  children: PropTypes.node.isRequired,
  active: PropTypes.bool,
  className: PropTypes.string,
  style: PropTypes.object,
}

export default link(LinkStyle)
