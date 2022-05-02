import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import './TodoFooter.scss'

import Button from '../UI/Button'

import { setFilterValue } from '../../store/actions'
import { getCompletedQuantity, getTodoCount } from '../../helpers'
import withTodosApi from '../hocHelpers'
import { sendToDeleteCompletedTodo } from '../../store/asyncFoo'

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
    const { setFilterValue, clearCompleted, todos, filterValue, loading } =
      this.props

    if (loading === 'pending' || loading === 'failed') {
      return null
    }

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
          onClick={() => clearCompleted(todos)}
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
  loading: PropTypes.string,
  filterValue: PropTypes.string
}

const mapStateToProps = ({ todos, filterValue, loading }) => {
  return {
    todos,
    filterValue,
    loading
  }
}

const mapDispatchToProps = (dispath, { todosApi }) => {
  return bindActionCreators(
    { clearCompleted: sendToDeleteCompletedTodo(todosApi), setFilterValue },
    dispath
  )
}

export default withTodosApi(
  connect(mapStateToProps, mapDispatchToProps)(TodoFooter)
)
