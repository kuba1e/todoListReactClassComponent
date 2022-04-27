import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './TodoListItem.scss'

import Button from '../UI/Button'
import Checkbox from '../UI/Checkbox'
import Emitter from '../../EventEmitter'

export default class TodoListItem extends Component {
  constructor() {
    super()
    this.state = {
      isButtonActive: false
    }
  }

  onShowModal = () => {
    const {
      todo: { id }
    } = this.props
    Emitter.emit('MODAL_SHOW_BTN', id)
  }

  render() {
    const { todo, onToggleDone, onSetEditedTodoValue } = this.props
    const { label, id, done } = todo

    const { isButtonActive } = this.state

    return (
      <li
        className='todo__list-item'
        onMouseEnter={() => this.setState({ isButtonActive: true })}
        onMouseLeave={() => this.setState({ isButtonActive: false })}
      >
        <Checkbox
          className={done ? 'done' : ''}
          onChange={() => onToggleDone(id)}
          checked={done}
        />
        <p
          className={`todo__list-item-text ${
            done ? 'todo__list-item-text--done' : ''
          }`}
        >
          {label}
        </p>
        <div className='btns-container'>
          <Button
            className={`edit-btn ${isButtonActive ? 'edit-btn--active' : ''}`}
            onClick={() => {
              window.scrollTo({
                top: 0,
                behavior: 'smooth'
              })
              onSetEditedTodoValue(todo)
            }}
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
  onSetEditedTodoValue: PropTypes.func
}
