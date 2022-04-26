import React, { Component, Fragment } from 'react'
import './TodoListItem.scss'
import PropTypes from 'prop-types'
import Checkbox from '../UI/Checkbox'
import Button from '../UI/Button'
import Emitter from '../../EventEmitter'
export default class TodoListItem extends Component {
  state = {
    isButtonActive: false
  }

  onShowModal = () => {
    Emitter.emit('MODAL_SHOW_BTN', this.props.todo.id)
  }

  render() {
    const {
      todo: { label, id, done },
      onToggleDone
    } = this.props

    const { isButtonActive } = this.state

    return (
      <Fragment>
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
            className={`delete-btn ${
              isButtonActive ? 'delete-btn--active' : ''
            }`}
            onClick={this.onShowModal}
          ></Button>
        </li>
      </Fragment>
    )
  }
}

TodoListItem.propTypes = {
  todo: PropTypes.object,
  onToggleDone: PropTypes.func
}
