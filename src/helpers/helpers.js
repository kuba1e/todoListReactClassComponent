export const getCompletedQuantity = (todos) => {
  return todos.filter((todo) => todo.done).length
}

export const areAllCompleted = (todos) => {
  return !(todos.length - getCompletedQuantity(todos)) && todos.length
}

export const getTodoCount = (todos) => {
  return todos.filter((todo) => !todo.done).length
}

export const getFilteredTodosList = (filterValue, todos) => {
  switch (filterValue) {
    case 'all':
      return todos
    case 'completed':
      return todos.filter((todo) => todo.done)
    case 'active':
      return todos.filter((todo) => !todo.done)
  }
}
