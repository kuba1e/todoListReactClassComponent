import React, { Component, Fragment } from 'react'
import './App.scss'
import Title from '../UI/Title'
import TodoHeader from '../TodoHeader'
import TodoList from '../TodoList'
import TodoFooter from '../TodoFooter'
import ErrorBoundary from '../ErrorBoundary'

export default class App extends Component {
  render() {
    return (
      <Fragment>
        <Title>todos</Title>
        <ErrorBoundary>
          <div className='todo'>
            <TodoHeader />
            <TodoList />
            <TodoFooter />
          </div>
        </ErrorBoundary>
      </Fragment>
    )
  }
}
