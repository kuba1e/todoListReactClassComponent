import React, { Component, Fragment } from 'react'

import './App.scss'

import ErrorBoundary from '../ErrorBoundary'
import Title from '../UI/Title'
import TodoHeader from '../TodoHeader'
import TodoList from '../TodoList'
import TodoFooter from '../TodoFooter'

export default class App extends Component {
  render() {
    return (
      <>
        <Title>todos</Title>
        <ErrorBoundary>
          <div className='todo'>
            <TodoHeader />
            <TodoList />
            <TodoFooter />
          </div>
        </ErrorBoundary>
      </>
    )
  }
}
