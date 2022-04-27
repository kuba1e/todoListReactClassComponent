import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'

import './TodoList.scss'

import ConfirmModal from '../UI/ConfirmModal'
import emitter from '../../EventEmitter'
import TodoListItem from '../TodoListItem'

import {
  addTodo,
  deleteTodo,
  setEditedTodoValue,
  toggleDoneTodo,
  getTodosFromLocalStorage
} from '../../store/actions'
import { getFilteredTodosList } from '../../helpers'

class TodoList extends Component {
  constructor() {
    super()
    this.state = {
      isConfirmModalActive: false,
      id: -1
    }
  }

  componentDidMount() {
    const todos = JSON.parse(localStorage.getItem('todos')) || []
    const { getTodosFromLocalStorage: getTodosFromLS } = this.props
    getTodosFromLS(todos)

    emitter.subscribe('MODAL_CLOSE_BTN', this.onCloseHandler)
    emitter.subscribe('MODAL_SHOW_BTN', this.onShowBtnHandler)
    emitter.subscribe('MODAL_DELETE_TODO', this.onDeleteTodoHandler)
  }

  componentDidUpdate(prevProps) {
    const { todos } = this.props
    if (prevProps.todos !== todos) {
      localStorage.setItem('todos', JSON.stringify(todos))
    }
  }

  componentWillUnmount() {
    emitter.deleteSubscribe('MODAL_CLOSE_BTN', this.onCloseHandler)
    emitter.deleteSubscribe('MODAL_SHOW_BTN', this.onShowBtnHandler)
    emitter.deleteSubscribe('MODAL_DELETE_TODO', this.onDeleteTodoHandler)
  }

  onCloseHandler = () => {
    this.setState({ isConfirmModalActive: false })
  }

  onShowBtnHandler = (id) => {
    this.setState({ id, isConfirmModalActive: true })
  }

  onDeleteTodoHandler = () => {
    const { deleteTodo } = this.props
    const { id } = this.state
    deleteTodo(id)
  }

  onDismiss = () => {
    emitter.emit('MODAL_CLOSE_BTN')
  }

  onConfirm = () => {
    emitter.emit('MODAL_DELETE_TODO')
    emitter.emit('MODAL_CLOSE_BTN')
  }

  render() {
    const { todos, setEditedTodoValue, filterValue, toggleDoneTodo } =
      this.props
    const { isConfirmModalActive } = this.state
    const todosForRendering = getFilteredTodosList(filterValue, todos)

    const confirmodal = isConfirmModalActive ? (
      <ConfirmModal onConfirm={this.onConfirm} onDismiss={this.onDismiss}>
        Do you want to delete?
      </ConfirmModal>
    ) : null

    return (
      <>
        {confirmodal}
        <ul className='todo__list'>
          {todosForRendering.map((todo) => {
            return (
              <TodoListItem
                key={todo.id}
                todo={todo}
                onToggleDone={toggleDoneTodo}
                onSetEditedTodoValue={setEditedTodoValue}
              />
            )
          })}
        </ul>
      </>
    )
  }
}

TodoList.propTypes = {
  getTodosFromLocalStorage: PropTypes.func,
  todos: PropTypes.array,
  filterValue: PropTypes.string,
  deleteTodo: PropTypes.func,
  setEditedTodoValue: PropTypes.func,
  toggleDoneTodo: PropTypes.func
}

const mapStateToProps = ({ todos, filterValue }) => {
  return { todos, filterValue }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      addTodo,
      deleteTodo,
      setEditedTodoValue,
      toggleDoneTodo,
      getTodosFromLocalStorage
    },
    dispatch
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoList)
