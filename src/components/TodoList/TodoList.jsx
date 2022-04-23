import React, { Component } from 'react'
import './TodoList.scss'
import TodoListItem from '../TodoListItem'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {
  addTodo,
  deleteTodo,
  toggleDoneTodo,
  getTodosFromLocalStorage
} from '../../store/actions'
import { getFilteredTodosList } from '../../helpers'

class TodoList extends Component {
  componentDidMount() {
    const todos = JSON.parse(localStorage.getItem('todos'))
    this.props.getTodosFromLocalStorage(todos)
  }

  componentDidUpdate(prevProps) {
    if (prevProps.todos !== this.props.todos) {
      localStorage.setItem('todos', JSON.stringify(this.props.todos))
    }
  }

  render() {
    const { todos = [], filterValue, deleteTodo, toggleDoneTodo } = this.props
    const todosForRendering = getFilteredTodosList(filterValue, todos)

    return (
      <ul className='todo__list'>
        {todosForRendering.map((todo) => {
          return (
            <TodoListItem
              key={todo.id}
              todo={todo}
              onToggleDone={toggleDoneTodo}
              onDelete={deleteTodo}
            />
          )
        })}
      </ul>
    )
  }
}

const mapStateToProps = ({ todos, filterValue }) => {
  return { todos, filterValue }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    { addTodo, deleteTodo, toggleDoneTodo, getTodosFromLocalStorage },
    dispatch
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoList)
