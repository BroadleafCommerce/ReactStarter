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
