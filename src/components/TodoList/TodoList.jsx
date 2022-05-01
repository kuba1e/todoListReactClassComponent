import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'

import './TodoList.scss'

import ConfirmModal from '../UI/ConfirmModal'
import TodoListItem from '../TodoListItem'
import Loader from '../Loader'
import TodoHeader from '../TodoHeader'
import ErrorIndicator from '../ErrorIndicator'

import {
  sentToUpdateAllTodo,
  fetchTodos,
  sentToUpdateTodo,
  sendToDeleteTodo
} from '../../store/asyncFoo'
import { getFilteredTodosList } from '../../helpers'
import withTodosApi from '../hocHelpers'

import emitter from '../../EventEmitter'

class TodoList extends Component {
  constructor() {
    super()
    this.state = {
      isConfirmModalActive: false,
      editedTodoActive: -1,
      id: -1
    }
  }

  componentDidMount() {
    const { getTodos } = this.props
    getTodos()

    emitter.subscribe('MODAL_CLOSE_BTN', this.onCloseHandler)
    emitter.subscribe('MODAL_SHOW_BTN', this.onShowBtnHandler)
    emitter.subscribe('MODAL_DELETE_TODO', this.onDeleteTodoHandler)
    emitter.subscribe('SET_EDITED_TODO_ACTIVE', this.onEditedTodoActive)
  }

  componentWillUnmount() {
    emitter.deleteSubscribe('MODAL_CLOSE_BTN', this.onCloseHandler)
    emitter.deleteSubscribe('MODAL_SHOW_BTN', this.onShowBtnHandler)
    emitter.deleteSubscribe('MODAL_DELETE_TODO', this.onDeleteTodoHandler)
    emitter.deleteSubscribe('SET_EDITED_TODO_ACTIVE', this.onEditedTodoActive)
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

  onEditedTodoActive = (editedTodoActive) => {
    this.setState({ editedTodoActive })
  }

  onDismiss = () => {
    emitter.emit('MODAL_CLOSE_BTN')
  }

  onConfirm = () => {
    emitter.emit('MODAL_DELETE_TODO')
    emitter.emit('MODAL_CLOSE_BTN')
  }

  render() {
    const {
      todos,
      setEditedTodoValue,
      filterValue,
      toggleDoneTodo,
      toggleAllDoneTodo,
      editTodo,
      loading,
      error
    } = this.props

    const { isConfirmModalActive, editedTodoActive } = this.state

    const todosForRendering = getFilteredTodosList(filterValue, todos)

    const confirmodal = isConfirmModalActive ? (
      <ConfirmModal onConfirm={this.onConfirm} onDismiss={this.onDismiss}>
        Do you want to delete?
      </ConfirmModal>
    ) : null

    const todosHeader =
      loading === 'succeded' && !error ? (
        <TodoHeader todos={todos} toggleAllDoneTodo={toggleAllDoneTodo} />
      ) : null

    const todoElements =
      loading === 'succeded' && !error
        ? todosForRendering.map((todo) => {
            return (
              <TodoListItem
                key={todo.id}
                todo={todo}
                onToggleDone={toggleDoneTodo}
                onSetEditedTodoValue={setEditedTodoValue}
                onEditTodo={editTodo}
                editedTodo={editedTodoActive}
              />
            )
          })
        : null

    const loader = loading === 'pending' && !error ? <Loader /> : null
    const errorIndicator =
      error && loading === 'failed' ? (
        <ErrorIndicator errorMessage={error} />
      ) : null

    return (
      <>
        {confirmodal}
        {errorIndicator}
        {todosHeader}
        <ul
          className={`todo__list ${
            loading === 'pending' ? 'todo__list--pending' : ''
          }`}
        >
          {loader}
          {todoElements}
        </ul>
      </>
    )
  }
}

TodoList.propTypes = {
  getTodos: PropTypes.func,
  todos: PropTypes.array,
  loading: PropTypes.string,
  error: PropTypes.string,
  filterValue: PropTypes.string,
  editTodo: PropTypes.func,
  deleteTodo: PropTypes.func,
  setEditedTodoValue: PropTypes.func,
  toggleDoneTodo: PropTypes.func,
  toggleAllDoneTodo: PropTypes.func
}

const mapStateToProps = ({ todos, filterValue, loading, error }) => {
  return { todos, filterValue, loading, error }
}

const mapDispatchToProps = (dispatch, { todosApi }) => {
  return bindActionCreators(
    {
      deleteTodo: sendToDeleteTodo(todosApi),
      editTodo: sentToUpdateTodo(todosApi),
      toggleDoneTodo: sentToUpdateTodo(todosApi),
      getTodos: fetchTodos(todosApi),
      toggleAllDoneTodo: sentToUpdateAllTodo(todosApi)
    },
    dispatch
  )
}

export default withTodosApi(
  connect(mapStateToProps, mapDispatchToProps)(TodoList)
)
