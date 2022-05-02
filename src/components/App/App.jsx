import React, { Component } from 'react'

import './App.scss'

import ErrorBoundary from '../ErrorBoundary'
import Title from '../UI/Title'
import TodoList from '../TodoList'
import TodoFooter from '../TodoFooter'
import LoginForm from '../LoginForm'

import { TodosApiProvider } from '../todosApiContext'
import todosApi from '../../services/apiService'

export default class App extends Component {
  render() {
    return (
      <TodosApiProvider value={todosApi}>
        <Title>todos</Title>
        <LoginForm />
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
