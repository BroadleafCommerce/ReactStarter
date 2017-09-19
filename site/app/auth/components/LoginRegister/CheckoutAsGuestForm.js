/*
 * #%L
 * React Site Starter
 * %%
 * Copyright (C) 2009 - 2017 Broadleaf Commerce
 * %%
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * 
 *       http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * #L%
 */
import React, { PureComponent } from 'react'
import {Field, Form, reduxForm} from 'redux-form'
import Button from 'material-kit/components/Button'
import LoginRegisterField from './LoginRegisterField'

class CheckoutAsGuestForm extends PureComponent {

    render() {
        return (
            <Form onSubmit={this.props.handleSubmit}>
                <div className='text-center'>
                    <h3 className='card-title'>Guests</h3>
                </div>
                <p className='checkout-guest-text'>
                    Would you like to continue the checkout process as a guest?  That's fine by us!  Next time try registering an account to make the checkout process quicker.
                </p>
                <Field addon='email' component={LoginRegisterField} label='Email' name='emailAddress' type='email' validate={validators.required}/>
                <Button className='pull-right' type='submit' primary>Checkout as Guest</Button>
            </Form>
        )
    }
}

const validators = {
    required: value => value ? undefined : 'Required'
}

export default reduxForm({ form: 'CheckoutAsGuestForm' })(CheckoutAsGuestForm)
