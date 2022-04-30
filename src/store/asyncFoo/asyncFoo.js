import { requestedToFetch, getTodos, addTodo, failedToFetch } from '../actions'

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

const sendTodo = (todosApi) => (todo) => {
  return async (dispatch) => {
    try {
      const { label } = todo
      const newTodo = { label, done: false }
      const reply = await todosApi('POST', todo)
      dispatch(addTodo(todo))
    } catch (error) {
      dispatch(failedToFetch(error.message))
    }
  }
}

export { fetchTodos }
