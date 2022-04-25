import React, { Component } from 'react'
import './TodoHeader.scss'
import PropTypes from 'prop-types'
import Button from '../UI/Button'
import TodoAddForm from '../TodoAddForm'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { toggleAllDoneTodo } from '../../store/actions'
import { areAllCompleted } from '../../helpers'

class TodoHeader extends Component {
  state = {
    isSelected: false
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.isSelected !== this.state.isSelected) {
      this.props.toggleAllDoneTodo(this.state.isSelected)
    }
  }

  render() {
    const { isSelected } = this.state
    const { todos } = this.props
    return (
      <div className='todo__form-container'>
        <Button
          className={`select-all-btn ${
            isSelected || areAllCompleted(todos)
              ? 'select-all-btn--selected'
              : ''
          }`}
          onClick={() => {
            this.setState(({ isSelected }) => ({ isSelected: !isSelected }))
          }}
        />
        <TodoAddForm />
      </div>
    )
  }
}

TodoHeader.propTypes = {
  toggleAllDoneTodo: PropTypes.func,
  todos: PropTypes.array
}

const mapStateToProps = ({ todos }) => {
  return { todos }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ toggleAllDoneTodo }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoHeader)
