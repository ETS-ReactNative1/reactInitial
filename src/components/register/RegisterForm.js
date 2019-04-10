import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { BwmInput } from 'components/shared/form/BwmInput';
import { BwmResError } from 'components/shared/form/BwmResError';

const RegisterForm = props => {
  const { handleSubmit, pristine, submitting, submitCb, valid, errors } = props
  return (
    <form onSubmit={handleSubmit(submitCb)}>
      <Field
        name="username"
        type="text"
        label='Username'
        className='form-control'
        component={BwmInput}
      />
      <Field
        name="email"
        type="email"
        label='Email'
        className='form-control'
        component={BwmInput}
      />
      <Field
        name="password"
        type="password"
        label='Password'
        className='form-control'
        component={BwmInput}
      />
      <Field
        name="passwordConfirmation"
        type="password"
        label='Password Confirmation'
        className='form-control'
        component={BwmInput}
      />
      <button className='btn btn-bwm btn-form' type="submit" disabled={!valid || pristine || submitting}>
        Register
      </button>
      <BwmResError errors={errors} />
    </form>
  )
}

const validate = values => {
  const errors = {};

    if (values.username && values.username.length < 4) {
    errors.username = 'Username min length is 4 characters!';
  }

  if (!values.email) {
    errors.email = 'Please enter email!';
  }
 // const re = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,32})");
  const re = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,32})");
  if (!(re.test(values.password))) {
     errors.password = 'Your password has to be alphanumeric with a Capital letter and a minimum of 8 Characters';
  }

  if (!values.passwordConfirmation || !values.password) {
    errors.passwordConfirmation = 'Please enter password and password confirmation!';
  }

  if (values.password !== values.passwordConfirmation) {
    errors.password = 'Passwords must be the same';
  }

  return errors;
}

export default reduxForm({
  form: 'registerForm',
  validate
})(RegisterForm)
