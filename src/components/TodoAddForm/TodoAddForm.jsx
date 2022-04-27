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
  render() {
    const { addTodo, editTodo, editedValue, setEditedTodoValue } = this.props

    const validationSchema = yup.object({
      label: yup.string().required('Please, fill what should you do')
    })
    const initialValues = isEditedTodoEmpty(editedValue)
      ? { label: '' }
      : { label: editedValue.label }

    return (
      <Formik
        initialValues={initialValues}
        enableReinitialize
        validateOnBlur={false}
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
          const isChanged = errors.label && touched.label
          return (
            <Form className='todo__form'>
              <input
                className={`todo__form-input ${
                  isChanged ? 'todo__form-input--error' : ''
                }`}
                placeholder='What needs to be done?'
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.label}
                name='label'
              />
              <p className='todo__form-error-message'>
                {isChanged ? errors.label : ''}
              </p>
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
