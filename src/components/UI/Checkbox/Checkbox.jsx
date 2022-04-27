import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './Checkbox.scss'

export default class Checkbox extends Component {
  render() {
    const { className = '', onChange, checked, children } = this.props
    return (
      <div className={`checkbox ${className}`}>
        <label className='checkbox__label'>
          {children}
          <input
            className='checkbox__input'
            onChange={onChange}
            type='checkbox'
            checked={checked}
          />
          <div className='checkbox__indicator' />
        </label>
      </div>
    )
  }
}

Checkbox.propTypes = {
  className: PropTypes.string,
  onChange: PropTypes.func,
  checked: PropTypes.bool,
  children: PropTypes.node
}
