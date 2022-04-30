import React from 'react'

import { TodosApiConsumer } from '../todosApiContext'

const withTodosApi = (Wrapped) => {
  return function (props) {
    return (
      <TodosApiConsumer>
        {(todosApi) => {
          return <Wrapped {...props} todosApi={todosApi} />
        }}
      </TodosApiConsumer>
    )
  }
}

export default withTodosApi
