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

export const ACTION_GET_TODOS_FROM_LOCAL_STORAGE =
  'ACTION_GET_TODOS_FROM_LOCAL_STORAGE'
export const getTodosFromLocalStorage = (todos) => ({
  type: ACTION_GET_TODOS_FROM_LOCAL_STORAGE,
  payload: todos
})
