import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class ErrorIndicator extends Component {
  render() {
    const { errorMessage } = this.props

    return (
      <div className='error-boundray'>
        <p>Ooops, something went wrong, error: {errorMessage}</p>
      </div>
    )
  }
}

ErrorIndicator.propTypes = {
  errorMessage: PropTypes.string
}
