import React, { Component } from 'react'

export default class ErrorIndicator extends Component {
  render() {
    const { error } = this.props

    return <p>Ooops, something went wrong, error:{error}</p>
  }
}
