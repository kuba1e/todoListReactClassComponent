import React, { Component } from 'react'
import './Checkbox.scss'
import PropTypes from 'prop-types'

export default class Checkbox extends Component {
  render() {
    const { className = '', onChange, checked, children } = this.props
    return (
      <div className='checkbox'>
        <label className='checkbox__label'>
          {children}
          <input
            className='checkbox__input'
            onChange={onChange}
            type='checkbox'
            checked={checked}
          />
          <div className={`checkbox__indicator ${className}`}></div>
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
