import { createContext } from 'react'

const { Provider: TodosApiProvider, Consumer: TodosApiConsumer } =
  createContext()

export { TodosApiProvider, TodosApiConsumer }
