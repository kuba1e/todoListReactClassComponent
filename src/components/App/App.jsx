import React, { Component } from 'react'

import './App.scss'

import ErrorBoundary from '../ErrorBoundary'
import Title from '../UI/Title'
import TodoList from '../TodoList'
import TodoFooter from '../TodoFooter'

import { TodosApiProvider } from '../todosApiContext'
import todosApi from '../../services/apiService'

export default class App extends Component {
  render() {
    return (
      <TodosApiProvider value={todosApi}>
        <Title>todos</Title>
        <ErrorBoundary>
          <div className='todo'>
            <TodoList />
            <TodoFooter />
          </div>
        </ErrorBoundary>
      </TodosApiProvider>
    )
  }
}
