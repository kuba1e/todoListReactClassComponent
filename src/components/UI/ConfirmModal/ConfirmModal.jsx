import React, { Component, Fragment } from 'react'
import './ConfirmModal.scss'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'
import Button from '../Button'
import Emitter from '../../../EventEmitter'

class ModalOverlay extends Component {
  onCloseHandler = (event) => {
    Emitter.emit('MODAL_CLOSE_BTN')
  }

  render() {
    const { children, onConfirm, onDismiss } = this.props

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
          <Button className='close-btn' onClick={onDismiss}></Button>
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
