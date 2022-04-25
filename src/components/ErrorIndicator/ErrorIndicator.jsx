import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class ErrorIndicator extends Component {
  render() {
    const { error } = this.props

    return <p>Ooops, something went wrong, error:{error}</p>
  }
}

ErrorIndicator.propTypes = {
  error: PropTypes.string
}
