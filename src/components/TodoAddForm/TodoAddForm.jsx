import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Formik, Form } from 'formik'
import * as yup from 'yup'

import './TodoAddForm.scss'

import { addTodo, editTodo, setEditedTodoValue } from '../../store/actions'
import { isEditedTodoEmpty } from '../../helpers'

class TodoAddForm extends Component {
  constructor() {
    super()
    this.state = {
      label: ''
    }
  }

  componentDidUpdate(prevProps) {
    const { editedValue } = this.props
    if (prevProps.editedValue !== editedValue) {
      this.setState(editedValue)
    }
  }

  render() {
    const { addTodo, editTodo, editedValue, setEditedTodoValue } = this.props
    const { label, ...otherState } = this.state

    return (
      <Formik
        initialValues={{ label: '' }}
        onSubmit={({ label }) => {
          if (!isEditedTodoEmpty(editedValue)) {
            editTodo({ ...otherState, label })
            setEditedTodoValue({})
          } else {
            addTodo(label)
          }
          this.setState({ label: '' })
        }}
      >
        {({ errors, touched }) => (
          <Form className='todo__form'>
            <input
              className='todo__form-input'
              placeholder='What needs to be done?'
              name='label'
              value={label}
              onChange={({ target }) => {
                this.setState({ label: target.value })
              }}
            />
          </Form>
        )}
      </Formik>
    )
  }
}

TodoAddForm.propTypes = {
  addTodo: PropTypes.func,
  editTodo: PropTypes.func,
  editedValue: PropTypes.object,
  setEditedTodoValue: PropTypes.func
}

const mapStateToProps = ({ editedValue }) => {
  return {
    editedValue
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ addTodo, editTodo, setEditedTodoValue }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoAddForm)
