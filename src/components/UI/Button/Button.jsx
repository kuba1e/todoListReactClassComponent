import React, { Component } from 'react'
import './Button.scss'

export default class Button extends Component {
  render() {
    const { onClick, className = '', children, type = 'button' } = this.props

    return (
      <button className={`button ${className}`} onClick={onClick}>
        {children}
      </button>
    )
  }
}
