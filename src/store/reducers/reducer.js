import {
  ACTION_ADD_TO_DO,
  ACTION_DELETE_TO_DO,
  ACTION_TOGGLE_DONE_TO_DO,
  ACTION_TOGGLE_DONE_ALL_TO_DO,
  ACTION_CLEAR_COMPLETED_TO_DO,
  ACTION_SET_FILTER_VALUE,
  ACTION_GET_TODOS_FROM_LOCAL_STORAGE
} from '../actions'

const getTheBiggestId = (todos) => {
  return (
    [...todos]
      .sort((prevTodo, nextTodo) => {
        const subtractionResult = prevTodo - nextTodo
        if (subtractionResult < 0) {
          return -1
        } else if (subtractionResult > 0) {
          return 1
        } else {
          return 0
        }
      })
      .at(-1).id + 1
  )
}

const generateId = (todos) => {
  if (!todos.length) {
    return 1
  } else {
    return getTheBiggestId(todos)
  }
}

const createTodo = (label, todos) => {
  return {
    id: generateId(todos),
    label,
    done: false
  }
}

const deleteTodo = (id, todos) => {
  return todos.filter((todo) => todo.id !== id)
}

const toggleDoneTodo = (id, todos) => {
  return todos.map((todo) => {
    if (todo.id === id) {
      return {
        ...todo,
        done: !todo.done
      }
    } else {
      return todo
    }
  })
}

const toggleAllDoneTodo = (status, todos) => {
  return todos.map((todo) => {
    return { ...todo, done: status }
  })
}

const clearCompletedTodo = (todos) => {
  return todos.filter((todo) => !todo.done)
}

const initialState = {
  todos: [],
  filterValue: 'all'
}

export const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ACTION_ADD_TO_DO:
      return {
        ...state,
        todos: [...state.todos, createTodo(payload, state.todos)]
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
    case ACTION_GET_TODOS_FROM_LOCAL_STORAGE:
      return {
        ...state,
        todos: payload
      }
    default:
      return state
  }
}
