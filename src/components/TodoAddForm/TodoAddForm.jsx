import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Formik, Form } from 'formik'
import * as yup from 'yup'

import './TodoAddForm.scss'

import { addTodo } from '../../store/actions'

class TodoAddForm extends Component {
  onSubmitHandler = ({ label }, { resetForm }) => {
    const { addTodo } = this.props
    if (label) {
      addTodo(label)
    }
    resetForm({
      values: {
        label: ''
      }
    })
  }

  render() {
    const validationSchema = yup.object({
      label: yup.string().min(3, 'Please, write more about todo')
    })

    const initialValues = { label: '' }

    return (
      <Formik
        initialValues={initialValues}
        enableReinitialize
        validateOnBlur={false}
        validationSchema={validationSchema}
        onSubmit={this.onSubmitHandler}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          submitForm
        }) => {
          const isChanged = errors.label && touched.label

          return (
            <Form className='todo__form'>
              <input
                className={`todo__form-input ${
                  isChanged ? 'todo__form-input--error' : ''
                }`}
                placeholder='What needs to be done?'
                onChange={handleChange}
                onBlur={(event) => {
                  handleBlur(event)
                  submitForm()
                }}
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
  addTodo: PropTypes.func
}

const mapStateToProps = ({ editedValue }) => {
  return {
    editedValue
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ addTodo }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoAddForm)
