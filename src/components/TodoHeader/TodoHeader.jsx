import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import './TodoHeader.scss'

import Button from '../UI/Button'
import TodoAddForm from '../TodoAddForm'

import { sentToUpdateAllTodo } from '../../store/asyncFoo'
import { areAllCompleted } from '../../helpers'

import withTodosApi from '../hocHelpers'

class TodoHeader extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isSelected: false
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { isSelected } = this.state
    const { toggleAllDoneTodo } = this.props
    if (prevState.isSelected !== this.state.isSelected) {
      console.log(isSelected)
      toggleAllDoneTodo(isSelected)
    }
  }

  render() {
    const { isSelected } = this.state
    const { todos } = this.props
    return (
      <div className='todo__form-container'>
        <Button
          className={`select-all-btn ${
            isSelected || areAllCompleted(todos)
              ? 'select-all-btn--selected'
              : ''
          }`}
          onClick={() => {
            this.setState(({ isSelected }) => ({ isSelected: !isSelected }))
          }}
        />
        <TodoAddForm />
      </div>
    )
  }
}

TodoHeader.propTypes = {
  toggleAllDoneTodo: PropTypes.func,
  todos: PropTypes.array
}

const mapStateToProps = ({ todos }) => {
  return { todos }
}

const mapDispatchToProps = (dispatch, { todosApi }) => {
  return bindActionCreators(
    { toggleAllDoneTodo: sentToUpdateAllTodo(todosApi) },
    dispatch
  )
}

export default withTodosApi(
  connect(mapStateToProps, mapDispatchToProps)(TodoHeader)
)
