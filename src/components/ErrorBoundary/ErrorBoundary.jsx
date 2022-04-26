import React, { Component } from 'react'
import './ErrorBoundary.scss'
import ErrorIndicator from '../ErrorIndicator'
import PropTypes from 'prop-types'

export default class ErrorBoundary extends Component {
  state = {
    error: ''
  }

  componentDidCatch(error) {
    this.setState({ error: error.message })
  }

  render() {
    const content = this.state.error ? (
      <ErrorIndicator error={this.state.error} />
    ) : (
      this.props.children
    )

    return content
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node
}
