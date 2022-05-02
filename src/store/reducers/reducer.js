import {
  ACTION_ADD_TO_DO,
  ACTION_DELETE_TO_DO,
  ACTION_TOGGLE_DONE_ALL_TO_DO,
  ACTION_CLEAR_COMPLETED_TO_DO,
  ACTION_SET_FILTER_VALUE,
  ACTION_GET_TODOS,
  ACTION_EDIT_TO_DO,
  ACTION_REQUESTED_TO_FETCH,
  ACTION_FAILED_TO_FETCH,
  ACTION_SET_USER_DATA,
  ACTION_SET_AUTH_STATUS
} from '../actions'

import {
  deleteTodo,
  toggleAllDoneTodo,
  clearCompletedTodo,
  editTodo
} from '../../helpers'

const initialState = {
  todos: [],
  filterValue: 'all',
  loading: 'idle',
  error: null,
  user: {},
  isAuth: false
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

    case ACTION_SET_USER_DATA:
      return {
        ...state,
        loading: 'succeded',
        user: payload
      }

    case ACTION_SET_AUTH_STATUS:
      return {
        ...state,
        isAuth: payload
      }

    default:
      return initialState
  }
}
