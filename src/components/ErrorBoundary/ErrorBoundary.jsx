import React, { Component } from 'react'
import ErrorIndicator from '../ErrorIndicator'

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
