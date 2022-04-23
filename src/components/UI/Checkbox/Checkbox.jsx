import React, { Component } from 'react'
import './Checkbox.scss'

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
