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
      const { label } = editedValue
      this.setState({ label })
    }
  }

  render() {
    const { addTodo, editTodo, editedValue, setEditedTodoValue } = this.props
    const { label } = this.state

    const validationSchema = yup.object({
      label: yup
        .string()
        .min(2, 'Minimum 3 symbols for describe todo')
        .required('Please, fill what should you do')
    })

    return (
      <Formik
        initialValues={{ label }}
        enableReinitialize
        validationSchema={validationSchema}
        onSubmit={({ label }, { resetForm }) => {
          if (!isEditedTodoEmpty(editedValue)) {
            editTodo({ ...editedValue, label })
            setEditedTodoValue({})
          } else {
            addTodo(label)
          }
          resetForm({
            values: {
              label: ''
            }
          })
        }}
      >
        {({ values, errors, touched, handleChange, handleBlur }) => {
          return (
            <Form className='todo__form'>
              <input
                className={`todo__form-input ${
                  errors.label && touched.label ? 'todo__form-input--error' : ''
                }`}
                placeholder='What needs to be done?'
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.label}
                name='label'
              />
            </Form>
          )
        }}
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
