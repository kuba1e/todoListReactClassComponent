import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import './TodoFooter.scss'
import Button from '../UI/Button'

import { clearCompleted, setFilterValue } from '../../store/actions'
import { getCompletedQuantity, getTodoCount } from '../../helpers'

const filters = [
  {
    id: 1,
    label: 'All',
    value: 'all'
  },
  { id: 2, label: 'Active', value: 'active' },
  {
    id: 3,
    label: 'Completed',
    value: 'completed'
  }
]

class TodoFooter extends Component {
  render() {
    const { setFilterValue, clearCompleted, todos, filterValue } = this.props
    return (
      <div className='todo__control'>
        <div className='todo__control-count'>
          <span className='todo__control-count-info'>
            {getTodoCount(todos)}
          </span>
          <span className='todo__control-count-info-text'>{` item${
            getTodoCount(todos) > 1 ? 's ' : ' '
          }`}</span>
          left
        </div>
        <ul className='todo__control-filter-list'>
          {filters.map(({ id, label, value }) => {
            return (
              <li key={id} className='todo__control-filter-list-item'>
                <Button
                  className={`filter-btn ${
                    value === filterValue ? 'filter-btn--checked' : ''
                  }`}
                  onClick={() => setFilterValue(value)}
                >
                  {label}
                </Button>
              </li>
            )
          })}
        </ul>
        <Button
          className={`clear-completed-btn ${
            getCompletedQuantity(todos) ? 'clear-completed-btn--active' : ''
          }`}
          onClick={clearCompleted}
        >
          Clear completed
        </Button>
      </div>
    )
  }
}

TodoFooter.propTypes = {
  setFilterValue: PropTypes.func,
  clearCompleted: PropTypes.func,
  todos: PropTypes.array,
  filterValue: PropTypes.string
}

const mapStateToProps = ({ todos, filterValue }) => {
  return {
    todos,
    filterValue
  }
}

const mapDispatchToProps = (dispath) => {
  return bindActionCreators({ clearCompleted, setFilterValue }, dispath)
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoFooter)
