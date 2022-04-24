import React, { Component, Fragment } from 'react'
import './TodoListItem.scss'
import Checkbox from '../UI/Checkbox'
import Button from '../UI/Button'
import ConfirmModal from '../UI/ConfirmModal'

export default class TodoListItem extends Component {
  state = {
    isButtonActive: false,
    isConfirmModalActive: false
  }

  onHideModal = () => {
    this.setState({ isConfirmModalActive: false })
  }

  onShowModal = () => {
    this.setState({ isConfirmModalActive: true })
  }

  render() {
    const {
      todo: { label, id, done },
      onToggleDone,
      onDelete
    } = this.props

    const { isButtonActive, isConfirmModalActive } = this.state

    const confirmModal = isConfirmModalActive ? (
      <ConfirmModal
        onConfirm={() => {
          onDelete(id)
          this.onHideModal()
        }}
        onDismiss={this.onHideModal}
      >
        Do you want to delete?
      </ConfirmModal>
    ) : null

    return (
      <Fragment>
        {confirmModal}
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
