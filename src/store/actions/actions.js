export const ACTION_ADD_TO_DO = 'ACTION_ADD_TO_DO'
export const addTodo = (label) => ({ type: ACTION_ADD_TO_DO, payload: label })

export const ACTION_DELETE_TO_DO = 'ACTION_DELETE_TO_DO'
export const deleteTodo = (id) => ({ type: ACTION_DELETE_TO_DO, payload: id })

export const ACTION_TOGGLE_DONE_TO_DO = 'ACTION_TOGGLE_DONE_TO_DO'
export const toggleDoneTodo = (id) => ({
  type: ACTION_TOGGLE_DONE_TO_DO,
  payload: id
})

export const ACTION_TOGGLE_DONE_ALL_TO_DO = 'ACTION_TOGGLE_DONE_ALL_TO_DO'
export const toggleAllDoneTodo = (status) => ({
  type: ACTION_TOGGLE_DONE_ALL_TO_DO,
  payload: status
})

export const ACTION_CLEAR_COMPLETED_TO_DO = 'ACTION_CLEAR_COMPLETED_TO_DO'
export const clearCompleted = () => ({ type: ACTION_CLEAR_COMPLETED_TO_DO })

export const ACTION_SET_FILTER_VALUE = 'ACTION_SET_FILTER_VALUE'
export const setFilterValue = (value) => ({
  type: ACTION_SET_FILTER_VALUE,
  payload: value
})

export const ACTION_EDIT_TO_DO = 'ACTION_EDIT_TO_DO'
export const editTodo = (todo) => ({ type: ACTION_EDIT_TO_DO, payload: todo })

export const ACTION_GET_TODOS = 'ACTION_GET_TODOS'
export const getTodos = (todos) => ({
  type: ACTION_GET_TODOS,
  payload: todos
})

export const ACTION_REQUESTED_TO_FETCH = 'ACTION_REQUESTED_TO_FETCH'
export const requestedToFetch = () => ({
  type: ACTION_REQUESTED_TO_FETCH
})

export const ACTION_FAILED_TO_FETCH = 'ACTION_FAILED_TO_FETCH'
export const failedToFetch = (error) => ({
  type: ACTION_FAILED_TO_FETCH,
  payload: error
})

export const ACTION_SET_USER_DATA = 'ACTION_SET_USER_DATA'
export const setUserData = (userData) => ({
  type: ACTION_SET_USER_DATA,
  payload: userData
})

export const ACTION_SET_AUTH_STATUS = 'ACTION_SET_AUTH_STATUS'
export const setAuthStatus = (status) => ({
  type: ACTION_SET_AUTH_STATUS,
  payload: status
})
