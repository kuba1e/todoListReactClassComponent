import {
  requestedToFetch,
  getTodos,
  addTodo,
  editTodo,
  toggleAllDoneTodo,
  failedToFetch,
  deleteTodo
} from '../actions'

const fetchTodos = (todosApi) => () => {
  return async (dispatch) => {
    try {
      dispatch(requestedToFetch())
      const todos = await todosApi()
      dispatch(getTodos(todos))
    } catch (error) {
      dispatch(failedToFetch(error.message))
    }
  }
}

const sendToAddTodo = (todosApi) => (label) => {
  return async (dispatch) => {
    try {
      const newTodo = { label, done: false }
      const reply = await todosApi('POST', newTodo)
      dispatch(addTodo(reply))
    } catch (error) {
      dispatch(failedToFetch(error.message))
    }
  }
}

const sentToUpdateTodo = (todosApi) => (todo) => {
  return async (dispatch) => {
    try {
      const { id, ...todoData } = todo
      await todosApi('PUT', todoData, id)
      dispatch(editTodo(todo))
    } catch (error) {
      dispatch(failedToFetch(error.message))
    }
  }
}

const sentToUpdateAllTodo = (todosApi) => (status) => {
  return async (dispatch) => {
    try {
      await todosApi('PUT', { done: status })
      dispatch(toggleAllDoneTodo(status))
    } catch (error) {
      dispatch(failedToFetch(error.message))
    }
  }
}

const sendToDeleteTodo = (todosApi) => (id) => {
  return async (dispatch) => {
    try {
      await todosApi('DELETE', null, id)
      dispatch(deleteTodo(id))
    } catch (error) {
      dispatch(failedToFetch(error.message))
    }
  }
}

export {
  fetchTodos,
  sendToAddTodo,
  sentToUpdateTodo,
  sendToDeleteTodo,
  sentToUpdateAllTodo
}
