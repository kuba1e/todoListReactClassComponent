import React, { Component, Fragment } from 'react'
import './TodoList.scss'
import PropTypes from 'prop-types'
import TodoListItem from '../TodoListItem'
import ConfirmModal from '../UI/ConfirmModal'
import emitter from '../../EventEmitter'
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

    emitter.on('MODAL_CLOSE_BTN', this.onCloseHandler)
    emitter.on('MODAL_SHOW_BTN', this.onShowBtnHandler)
    emitter.on('MODAL_DELETE_TODO', this.onDeleteTodoHandler)
  }

  componentDidUpdate(prevProps) {
    if (prevProps.todos !== this.props.todos) {
      localStorage.setItem('todos', JSON.stringify(this.props.todos))
    }
  }

  componentWillUnmount() {
    emitter.off('MODAL_CLOSE_BTN', this.onCloseHandler)
    emitter.off('MODAL_SHOW_BTN', this.onShowBtnHandler)
    emitter.off('MODAL_DELETE_TODO', this.onDeleteTodoHandler)
  }

  onCloseHandler = () => {
    this.setState({ isConfirmModalActive: false })
  }

  onShowBtnHandler = (id) => {
    this.setState({ id, isConfirmModalActive: true })
  }

  onDeleteTodoHandler = () => {
    this.props.deleteTodo(this.state.id)
  }

  onDismiss = () => {
    emitter.emit('MODAL_CLOSE_BTN')
  }

  onConfirm = () => {
    emitter.emit('MODAL_DELETE_TODO')
    emitter.emit('MODAL_CLOSE_BTN')
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
