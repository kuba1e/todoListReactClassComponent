import React, { Component, Fragment } from 'react'
import ReactDOM from 'react-dom'
import './ConfirmModal.scss'
import Button from '../Button'

class ModalOverlay extends Component {
  render() {
    const { children, onConfirm, onDismiss } = this.props
    console.log(onConfirm)
    return (
      <div
        className='backdrop'
        onClick={({ target }) => {
          if (target.classList.contains('backdrop')) {
            onDismiss()
          }
        }}
      >
        <div className='modal-overlay'>
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
    const { onConfirm, onDismiss, children } = this.props

    return (
      <Fragment>
        {ReactDOM.createPortal(
          <ModalOverlay onConfirm={onConfirm} onDismiss={onDismiss}>
            {children}
          </ModalOverlay>,
          document.getElementById('overlay-root')
        )}
      </Fragment>
    )
  }
}
