import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './Button.scss'

export default class Button extends Component {
  render() {
    const { onClick, className = '', children, type = 'button' } = this.props

    return (
      <button className={`button ${className}`} onClick={onClick} type={type}>
        {children}
      </button>
    )
  }
}

Button.propTypes = {
  onClick: PropTypes.func,
  className: PropTypes.string,
  children: PropTypes.node,
  type: PropTypes.string
}
