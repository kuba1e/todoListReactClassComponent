import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import withTodosApi from '../hocHelpers'
import { loginUser, logoutUser, userRegistration } from '../../store/asyncFoo'

class LoginForm extends Component {
  constructor() {
    super()
    this.state = {
      email: '',
      password: ''
    }
  }

  render() {
    const { email, password } = this.state
    const { loginUser, userRegistration, logoutUser } = this.props

    return (
      <div className=''>
        <form
          onSubmit={(event) => {
            event.preventDefault()
          }}
        >
          <label>
            Email
            <input
              value={email}
              onChange={({ target: { value } }) => {
                this.setState({ email: value })
              }}
            />
          </label>
          <label>
            Password
            <input
              value={password}
              onChange={({ target: { value } }) => {
                this.setState({ password: value })
              }}
              type='password'
            />
          </label>

          <button
            onClick={() => {
              loginUser({
                email: this.state.email,
                password: this.state.password
              })
            }}
          >
            Login
          </button>
          <button
            onClick={() => {
              userRegistration({
                email: this.state.email,
                password: this.state.password
              })
            }}
          >
            Registration
          </button>
          <button onClick={logoutUser}>Logout</button>
        </form>
      </div>
    )
  }
}

LoginForm.propTypes = {
  loginUser: PropTypes.func,
  logoutUser: PropTypes.func,
  userRegistration: PropTypes.func
}

const mapDispathToProps = (dispatch, { apiService }) => {
  return bindActionCreators(
    {
      loginUser: loginUser(apiService),
      userRegistration: userRegistration(apiService),
      logoutUser: logoutUser(apiService)
    },
    dispatch
  )
}

export default withTodosApi(connect(null, mapDispathToProps)(LoginForm))
