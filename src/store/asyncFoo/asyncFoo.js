import {
  requestedToFetch,
  getTodos,
  addTodo,
  editTodo,
  toggleAllDoneTodo,
  failedToFetch,
  deleteTodo,
  setAuthStatus,
  setUserData
} from '../actions'

const loginUser = (todosApi) => (data) => {
  return async (dispatch) => {
    try {
      dispatch(requestedToFetch())
      const userData = await todosApi('POST', data, '/login')
      if (!Object.keys(userData.data).length) {
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

const userRegistration = (todosApi) => (data) => {
  return async (dispatch) => {
    try {
      dispatch(requestedToFetch())
      const userData = await todosApi('POST', data, '/registration')
      if (!Object.keys(userData.data).length) {
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

const logoutUser = (todosApi) => () => {
  return async (dispatch) => {
    try {
      dispatch(requestedToFetch())
      const response = await todosApi('POST', {}, '/logout')
      dispatch(setAuthStatus(false))
      dispatch(setUserData({}))

      localStorage.removeItem('token')
    } catch (error) {
      dispatch(failedToFetch(error.message))
    }
  }
}

const checkAuth = () => {
  return async (dispatch) => {
    try {
      const response = await fetch('http://localhost:4000/refresh', {
        method: 'GET',
        credentials: 'include'
      })

      const parsedResponse = await response.json()

      dispatch(setAuthStatus(true))
      dispatch(setUserData(parsedResponse.data.user))

      localStorage.setItem(
        'token',
        JSON.stringify(parsedResponse.data.accessToken)
      )
    } catch (error) {
      dispatch(failedToFetch(error.message))
    }
  }
}

const fetchTodos = (todosApi) => () => {
  return async (dispatch) => {
    try {
      dispatch(requestedToFetch())
      const todos = await todosApi('GET', null, '/todos')
      dispatch(getTodos(todos.data))
    } catch (error) {
      dispatch(failedToFetch(error.message))
    }
  }
}

const sendToAddTodo = (todosApi) => (label) => {
  return async (dispatch) => {
    try {
      const newTodo = { label, done: false }
      const reply = await todosApi('POST', newTodo, '/todos')
      dispatch(addTodo(reply.data))
    } catch (error) {
      dispatch(failedToFetch(error.message))
    }
  }
}

const sentToUpdateTodo = (todosApi) => (todo) => {
  return async (dispatch) => {
    try {
      const { id, ...todoData } = todo
      await todosApi('PUT', todoData, `/todos/${id}`)
      dispatch(editTodo(todo))
    } catch (error) {
      dispatch(failedToFetch(error.message))
    }
  }
}

const sentToUpdateAllTodo = (todosApi) => (status) => {
  return async (dispatch) => {
    try {
      await todosApi('PUT', { done: status }, '/todos')
      dispatch(toggleAllDoneTodo(status))
    } catch (error) {
      dispatch(failedToFetch(error.message))
    }
  }
}

const sendToDeleteTodo = (todosApi) => (id) => {
  return async (dispatch) => {
    try {
      await todosApi('DELETE', null, `/todos/${id}`)
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
  sentToUpdateAllTodo,
  loginUser,
  logoutUser,
  userRegistration,
  checkAuth
}
