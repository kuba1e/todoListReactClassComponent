import {
  requestedToFetch,
  getTodos,
  addTodo,
  editTodo,
  toggleAllDoneTodo,
  clearCompleted,
  failedToFetch,
  deleteTodo,
  setAuthStatus,
  setUserData
} from '../actions'

import { isObjectEmpty } from '../../helpers'

const loginUser = (apiService) => (data) => {
  return async (dispatch) => {
    try {
      dispatch(requestedToFetch())
      const userData = await apiService('POST', data, '/login')

      const isUserDataEmpty = isObjectEmpty(userData.data)
      if (isUserDataEmpty) {
        throw new Error(userData.message)
      }
      dispatch(setAuthStatus(true))
      dispatch(setUserData(userData.data.user))
      localStorage.setItem('token', JSON.stringify(userData.data.accessToken))
    } catch (error) {
      dispatch(failedToFetch(error.message))
    }
  }
}

const userRegistration = (apiService) => (data) => {
  return async (dispatch) => {
    try {
      dispatch(requestedToFetch())
      const userData = await apiService('POST', data, '/registration')

      const isUserDataEmpty = isObjectEmpty(userData.data)
      if (isUserDataEmpty) {
        throw new Error(userData.message)
      }
      dispatch(setAuthStatus(true))
      dispatch(setUserData(userData.data.user))
      localStorage.setItem('token', JSON.stringify(userData.data.accessToken))
    } catch (error) {
      dispatch(failedToFetch(error.message))
    }
  }
}

const logoutUser = (apiService) => () => {
  return async (dispatch) => {
    try {
      dispatch(requestedToFetch())
      await apiService('POST', {}, '/logout')
      dispatch(setAuthStatus(false))
      dispatch(setUserData({}))

      localStorage.removeItem('token')
    } catch (error) {
      dispatch(failedToFetch(error.message))
    }
  }
}

const checkAuth = (apiService) => () => {
  return async (dispatch) => {
    try {
      const response = await apiService('GET', {}, '/refresh')

      dispatch(setAuthStatus(true))
      dispatch(setUserData(response.data.user))

      localStorage.setItem('token', JSON.stringify(response.data.accessToken))
    } catch (error) {
      dispatch(failedToFetch(error.message))
    }
  }
}

const fetchTodos = (apiService) => () => {
  return async (dispatch) => {
    try {
      dispatch(requestedToFetch())
      const todos = await apiService('GET', null, '/todos')
      dispatch(getTodos(todos.data))
    } catch (error) {
      dispatch(failedToFetch(error.message))
    }
  }
}

const sendToAddTodo = (apiService) => (label) => {
  return async (dispatch) => {
    try {
      const newTodo = { label, done: false }
      const reply = await apiService('POST', newTodo, '/todos')
      dispatch(addTodo(reply.data))
    } catch (error) {
      dispatch(failedToFetch(error.message))
    }
  }
}

const sentToUpdateTodo = (apiService) => (todo) => {
  return async (dispatch) => {
    try {
      const { id, ...todoData } = todo
      await apiService('PUT', todoData, `/todos/${id}`)
      dispatch(editTodo(todo))
    } catch (error) {
      dispatch(failedToFetch(error.message))
    }
  }
}

const sentToUpdateAllTodo = (apiService) => (status) => {
  return async (dispatch) => {
    try {
      await apiService('PUT', { done: status }, '/todos')
      dispatch(toggleAllDoneTodo(status))
    } catch (error) {
      dispatch(failedToFetch(error.message))
    }
  }
}

const sendToDeleteTodo = (apiService) => (id) => {
  return async (dispatch) => {
    try {
      await apiService('DELETE', {}, `/todos/${id}`)
      dispatch(deleteTodo(id))
    } catch (error) {
      dispatch(failedToFetch(error.message))
    }
  }
}

const sendToDeleteCompletedTodo = (apiService) => (todos) => {
  return async (dispatch) => {
    try {
      const todosForDeleting = todos
        .filter((todo) => todo.done)
        .map((todo) => todo.id)

      await apiService('DELETE', { todos: todosForDeleting }, '/todos')
      dispatch(clearCompleted())
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
  sentToUpdateAllTodo,
  sendToDeleteCompletedTodo,
  loginUser,
  logoutUser,
  userRegistration,
  checkAuth
}
