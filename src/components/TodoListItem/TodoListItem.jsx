import React, { Component } from 'react'
import './TodoListItem.scss'
import Checkbox from '../UI/Checkbox'
import Button from '../UI/Button'

export default class TodoListItem extends Component {
  state = {
    isButtonActive: false
  }

  render() {
    const {
      todo: { label, id, done },
      onDelete,
      onToggleDone
    } = this.props

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
        <Button
          className={`delete-btn ${isButtonActive ? 'delete-btn--active' : ''}`}
          onClick={() => onDelete(id)}
        ></Button>
      </li>
    )
  }
}
