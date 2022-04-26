import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class ErrorIndicator extends Component {
  render() {
    const { error } = this.props

    return (
      <div className='error-boundray'>
        <p>Ooops, something went wrong, error:{error}</p>
      </div>
    )
  }
}

ErrorIndicator.propTypes = {
  error: PropTypes.string
}
