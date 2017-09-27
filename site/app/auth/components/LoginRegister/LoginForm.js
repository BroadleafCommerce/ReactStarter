/*
 * #%L
 * React Site Starter
 * %%
 * Copyright (C) 2009 - 2017 Broadleaf Commerce
 * %%
 * Broadleaf Commerce React Starter
 * 
 * Written in 2017 by Broadleaf Commerce info@broadleafcommerce.com
 * 
 * To the extent possible under law, the author(s) have dedicated all copyright and related and neighboring rights to this software to the public domain worldwide. This software is distributed without any warranty.
 * You should have received a copy of the CC0 Public Domain Dedication along with this software. If not, see <http://creativecommons.org/publicdomain/zero/1.0/>.
 * 
 * Please Note - The scope of CC0 Public Domain Dedication extends to Broadleaf Commerce React Starter demo application alone. Linked libraries (including all Broadleaf Commerce Framework libraries) are subject to their respective licenses, including the requirements and restrictions specified therein.
 * #L%
 */
import React from 'react'
import { Link } from 'react-router-dom'
import {Field, Form, reduxForm} from 'redux-form'
import Button from 'material-kit/components/Button'
import LoginRegisterField from './LoginRegisterField'

const LoginForm = ({
    handleSubmit,
    error,
}) => (
    <Form onSubmit={handleSubmit}>
        <div className='text-center'>
            <h3 className='card-title'>Login</h3>
        </div>

        <Field addon='email' component={LoginRegisterField} label='Email' name='username' type='email' validate={validators.required}/>
        <Field addon='lock' component={LoginRegisterField} label='Password' name='password' type='password' validate={[validators.required, validators.password]}/>

        {error && (
            <p className='text-danger'>
                {error}
            </p>
        )}

        <Button className='pull-right' primary type='submit'>Login</Button>

        <div style={{ marginTop: 28 }}>
            <Link to='/login/forgotPassword'>
                Forgot Password
            </Link>
        </div>
    </Form>
)

const validators = {
    required: value => value ? undefined : 'Required',
    password: value => value && value.length >= 4 ? undefined : 'Password must be at least four characters'
}

export default reduxForm({ form: 'LoginForm' })(LoginForm)
