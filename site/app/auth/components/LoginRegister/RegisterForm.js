import React from 'react'
import { Link } from 'react-router-dom'
import { Field, Form, reduxForm } from 'redux-form'
import Button from 'material-kit/components/Button'
import LoginRegisterField from './LoginRegisterField'

const RegisterForm = ({
    handleSubmit,
    error,
}) => (
    <Form onSubmit={handleSubmit}>
        <div className='text-center'>
            <h3 className='card-title'>Register</h3>
        </div>

        <p>
            Don't have an account yet? Sign up for one now to gain access to all our member tools.
        </p>

        <Field addon='email' component={LoginRegisterField} label='Email' name='emailAddress' type='email' validate={validators.required}/>
        <Field addon='person' component={LoginRegisterField} label='First Name' name='firstName' type='text' validate={validators.required}/>
        <Field component={LoginRegisterField} label='Last Name' name='lastName' type='text' validate={validators.required}/>
        <Field addon='lock' component={LoginRegisterField} label='Password' name='password' type='password' validate={[validators.required, validators.password]}/>
        <Field component={LoginRegisterField} label='Confirm Password' name='confirmPassword' type='password' validate={[validators.required, validators.password]}/>

        {error && (
            <p className='text-danger'>
                {error}
            </p>
        )}

        <Button className='pull-right' primary type='submit'>Register</Button>
    </Form>
)

const validators = {
    required: value => value ? undefined : 'Required',
    password: value => value && value.length >= 4 ? undefined : 'Password must be at least four characters'
}

export default reduxForm({
    form: 'RegisterForm',
    validate: form => {
        const errors = {}

        if (form.password !== form.confirmPassword) {
            errors.confirmPassword = 'Password confirmation does not match password'
        }

        return errors
    }
 })(RegisterForm)
