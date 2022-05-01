import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './TodoHeader.scss'

import Button from '../UI/Button'
import TodoAddForm from '../TodoAddForm'

import { areAllCompleted } from '../../helpers'

class TodoHeader extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isSelected: areAllCompleted(this.props.todos)
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { isSelected } = this.state
    const { toggleAllDoneTodo } = this.props
    if (prevState.isSelected !== this.state.isSelected) {
      toggleAllDoneTodo(isSelected)
    }
  }

  render() {
    const { isSelected } = this.state
    return (
      <div className='todo__form-container'>
        <Button
          className={`select-all-btn ${
            isSelected ? 'select-all-btn--selected' : ''
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

export default TodoHeader
