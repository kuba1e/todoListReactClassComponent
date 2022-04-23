import React, { Component } from 'react'
import './Title.scss'

export default class Title extends Component {
  render() {
    const { className = '', children } = this.props
    return <h1 className={`title ${className}`}>{children}</h1>
  }
}
