import {
  ACTION_ADD_TO_DO,
  ACTION_DELETE_TO_DO,
  ACTION_TOGGLE_DONE_TO_DO,
  ACTION_TOGGLE_DONE_ALL_TO_DO,
  ACTION_CLEAR_COMPLETED_TO_DO,
  ACTION_SET_FILTER_VALUE,
  ACTION_GET_TODOS,
  ACTION_EDIT_TO_DO,
  ACTION_REQUESTED_TO_FETCH,
  ACTION_FAILED_TO_FETCH
} from '../actions'

import {
  deleteTodo,
  toggleDoneTodo,
  toggleAllDoneTodo,
  clearCompletedTodo,
  editTodo
} from '../../helpers'

const initialState = {
  todos: [],
  filterValue: 'all',
  loading: 'idle',
  error: null
}

export const todoReducer = (state, { type, payload }) => {
  switch (type) {
    case ACTION_ADD_TO_DO:
      return {
        ...state,
        todos: [...state.todos, payload]
      }
    case ACTION_DELETE_TO_DO:
      return {
        ...state,
        todos: deleteTodo(payload, state.todos)
      }
    case ACTION_TOGGLE_DONE_TO_DO:
      return {
        ...state,
        todos: toggleDoneTodo(payload, state.todos)
      }
    case ACTION_TOGGLE_DONE_ALL_TO_DO:
      return {
        ...state,
        todos: toggleAllDoneTodo(payload, state.todos)
      }
    case ACTION_CLEAR_COMPLETED_TO_DO:
      return {
        ...state,
        todos: clearCompletedTodo(state.todos)
      }
    case ACTION_SET_FILTER_VALUE:
      return {
        ...state,
        filterValue: payload
      }
    case ACTION_GET_TODOS:
      return {
        ...state,
        loading: 'succeded',
        todos: payload
      }
    case ACTION_REQUESTED_TO_FETCH:
      return {
        ...state,
        error: null,
        loading: 'pending'
      }
    case ACTION_FAILED_TO_FETCH:
      return {
        ...state,
        loading: 'failed',
        error: payload
      }

    case ACTION_EDIT_TO_DO:
      return {
        ...state,
        todos: editTodo(payload, state.todos)
      }
    default:
      return initialState
  }
}
