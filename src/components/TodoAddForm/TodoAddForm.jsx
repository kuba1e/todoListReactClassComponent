import React, { Component } from 'react'
import './TodoAddForm.scss'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { addTodo } from '../../store/actions'

class TodoAddForm extends Component {
  state = {
    label: ''
  }
  render() {
    const { addTodo } = this.props
    const { label } = this.state
    return (
      <form
        className='todo__form'
        onSubmit={(event) => {
          event.preventDefault()
          addTodo(label)
          this.setState({ label: '' })
        }}
      >
        <input
          className='todo__form-input'
          placeholder='What needs to be done?'
          name='todo'
          value={label}
          onChange={({ target }) => {
            this.setState({ label: target.value })
          }}
        />
      </form>
    )
  }
}

TodoAddForm.propTypes = {
  addTodo: PropTypes.func
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ addTodo }, dispatch)
}

export default connect(null, mapDispatchToProps)(TodoAddForm)
