import React from 'react'

import { TodosApiConsumer } from '../todosApiContext'

const withTodosApi = (Wrapped) => {
  return function (props) {
    return (
      <TodosApiConsumer>
        {(apiService) => {
          return <Wrapped {...props} apiService={apiService} />
        }}
      </TodosApiConsumer>
    )
  }
}

export default withTodosApi
