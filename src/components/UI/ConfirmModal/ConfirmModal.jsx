import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'

import './ConfirmModal.scss'

import Button from '../Button'

class ModalOverlay extends Component {
  render() {
    const { children, onDismiss, onConfirm } = this.props

    return (
      <div
        className='backdrop'
        onClick={({ target }) => {
          if (target.classList.contains('backdrop')) {
            onDismiss()
          }
        }}
        aria-hidden='true'
      >
        <div className='modal-overlay'>
          <Button className='close-btn' onClick={onDismiss} />
          <p className='modal-overlay__text'>{children}</p>
          <div className='modal-overlay__control'>
            <Button className='confirm-btn' onClick={onConfirm}>
              Yes
            </Button>
            <Button className='dismiss-btn' onClick={onDismiss}>
              Cancel
            </Button>
          </div>
        </div>
      </div>
    )
  }
}

export default class ConfirmModal extends Component {
  render() {
    const { onConfirm, children, onDismiss } = this.props

    return (
      <>
        {ReactDOM.createPortal(
          <ModalOverlay onConfirm={onConfirm} onDismiss={onDismiss}>
            {children}
          </ModalOverlay>,
          document.getElementById('overlay-root')
        )}
      </>
    )
  }
}

ModalOverlay.propTypes = {
  children: PropTypes.node,
  onConfirm: PropTypes.func,
  onDismiss: PropTypes.func
}

ConfirmModal.propTypes = {
  onConfirm: PropTypes.func,
  onDismiss: PropTypes.func,
  children: PropTypes.node
}
