import React, { Component, Fragment } from 'react'
import './TodoList.scss'
import PropTypes from 'prop-types'
import TodoListItem from '../TodoListItem'
import ConfirmModal from '../UI/ConfirmModal'
import Emitter from '../../EventEmitter'
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
  state = {
    isConfirmModalActive: false,
    id: -1
  }

  componentDidMount() {
    const todos = JSON.parse(localStorage.getItem('todos')) || []
    this.props.getTodosFromLocalStorage(todos)

    Emitter.on('MODAL_CLOSE_BTN', () =>
      this.setState({ isConfirmModalActive: false })
    )
    Emitter.on('MODAL_SHOW_BTN', (id) => {
      this.setState({ id, isConfirmModalActive: true })
    })

    Emitter.on('MODAL_DELETE_TODO', () => {
      this.props.deleteTodo(this.state.id)
    })
  }

  componentDidUpdate(prevProps) {
    if (prevProps.todos !== this.props.todos) {
      localStorage.setItem('todos', JSON.stringify(this.props.todos))
    }
  }

  componentWillUnmount() {
    Emitter.off('MODAL_CLOSE_BTN')
    Emitter.off('MODAL_SHOW_BTN')
    Emitter.off('MODAL_DELETE_TODO')
  }

  onDismiss = () => {
    Emitter.emit('MODAL_CLOSE_BTN')
  }

  onConfirm = () => {
    Emitter.emit('MODAL_DELETE_TODO')
    Emitter.emit('MODAL_CLOSE_BTN')
  }

  render() {
    const { todos, filterValue, toggleDoneTodo } = this.props
    const { isConfirmModalActive } = this.state
    const todosForRendering = getFilteredTodosList(filterValue, todos)

    const confirmodal = isConfirmModalActive ? (
      <ConfirmModal onConfirm={this.onConfirm} onDismiss={this.onDismiss}>
        Do you want to delete?
      </ConfirmModal>
    ) : null

    return (
      <Fragment>
        {confirmodal}
        <ul className='todo__list'>
          {todosForRendering.map((todo) => {
            return (
              <TodoListItem
                key={todo.id}
                todo={todo}
                onToggleDone={toggleDoneTodo}
              />
            )
          })}
        </ul>
      </Fragment>
    )
  }
}

TodoList.propTypes = {
  getTodosFromLocalStorage: PropTypes.func,
  todos: PropTypes.array,
  filterValue: PropTypes.string,
  deleteTodo: PropTypes.func,
  toggleDoneTodo: PropTypes.func
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
