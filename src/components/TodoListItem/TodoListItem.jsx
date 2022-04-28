import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './TodoListItem.scss'

import Button from '../UI/Button'
import Checkbox from '../UI/Checkbox'
import emitter from '../../EventEmitter'

export default class TodoListItem extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isButtonActive: false,
      inputValue: this.props.todo.label
    }
  }

  onShowModal = () => {
    const { id } = this.props.todo
    emitter.emit('MODAL_SHOW_BTN', id)
  }

  onSubmit = (event) => {
    event.preventDefault()
    const { todo, onEditTodo } = this.props
    const { inputValue } = this.state

    if (inputValue) {
      onEditTodo({ ...todo, label: inputValue })
    } else {
      this.setState({ inputValue: todo.label })
      this.onShowModal()
    }
    emitter.emit('SET_EDITED_TODO_ACTIVE', -1)
  }

  onInputChange = ({ target: { value } }) =>
    this.setState({ inputValue: value })

  onDoubleClick = () => {
    const { id } = this.props.todo
    emitter.emit('SET_EDITED_TODO_ACTIVE', id)
  }

  render() {
    const {
      todo: { id, done },
      onToggleDone,
      editedTodo
    } = this.props

    const { isButtonActive, inputValue } = this.state

    const isInputActive = editedTodo === id

    const todoLabel = (
      <p
        className={`todo__list-item-text ${
          done ? 'todo__list-item-text--done' : ''
        }`}
      >
        {inputValue}
      </p>
    )

    const todoEditInput = (
      <form
        className='todo__list-item-edit-form'
        onSubmit={this.onSubmit}
        onBlur={this.onSubmit}
      >
        <input
          className='todo__list-item-edit-input'
          autoFocus
          value={inputValue}
          onChange={this.onInputChange}
        />
      </form>
    )

    const todoBody = isInputActive ? todoEditInput : todoLabel

    return (
      <li
        className='todo__list-item'
        onMouseEnter={() => this.setState({ isButtonActive: true })}
        onMouseLeave={() => this.setState({ isButtonActive: false })}
        onDoubleClick={this.onDoubleClick}
      >
        <Checkbox
          className={isInputActive ? 'checkbox--hide' : ''}
          onChange={() => onToggleDone(id)}
          checked={done}
        />
        {todoBody}
        <div
          className={`btns-container ${
            isInputActive ? 'btns-container--hide' : ''
          }`}
        >
          <Button
            className={`edit-btn ${isButtonActive ? 'edit-btn--active' : ''}`}
            onClick={() => emitter.emit('SET_EDITED_TODO_ACTIVE', id)}
          />
          <Button
            className={`delete-btn ${
              isButtonActive ? 'delete-btn--active' : ''
            }`}
            onClick={this.onShowModal}
          />
        </div>
      </li>
    )
  }
}

TodoListItem.propTypes = {
  todo: PropTypes.object,
  onToggleDone: PropTypes.func,
  onEditTodo: PropTypes.func,
  editedTodo: PropTypes.number
}
