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
import PropTypes from 'prop-types'
import { Field, Form, reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import { resolve } from 'core/decorator/reduxResolve'
import { fetchCart } from 'cart/actions'
import { fetchCustomer } from 'account/actions'
import { getCustomer } from 'account/selectors'
import Button from 'material-kit/components/Button'
import request from 'core/util/superagent'
import classNames from 'classnames'

class AccountInformation extends PureComponent {
    static propTypes = {
        authenticationToken: PropTypes.string,
        customerToken: PropTypes.string,
        emailAddress: PropTypes.string,
        fetchCart: PropTypes.func,
        fetchCustomer: PropTypes.func,
        firstName: PropTypes.string,
        isFetching: PropTypes.bool,
        lastName: PropTypes.string
    }

    componentWillReceiveProps(nextProps) {
        const { authenticationToken, customerToken } = this.props
        const { authenticationToken: newAuthenticationToken, customerToken: newCustomerToken } = nextProps
        if (authenticationToken !== newAuthenticationToken || customerToken !== newCustomerToken) {
            nextProps.fetchCustomer(true)
        }
    }

    _onSubmitForm = form => {
        const { authenticationToken, customerToken, fetchCart, fetchCustomer } = this.props
        request.put('/api/customer')
            .set('Authorization', authenticationToken)
            .set('X-Customer-Token', customerToken || null)
            .send(form)
            .end((err, response) => {
                if (err) {
                    throw new SubmissionError({ _error: 'Error updating customer' })
                }

                fetchCart(true)
                fetchCustomer(true)
            })
    }

    render() {
        const { emailAddress, firstName, lastName } = this.props
        return (
            <div>
                <h3>Update Account Information</h3>
                <hr />
                <div className='col-sm-9 col-md-6'>
                    <AccountInformationForm initialValues={{ emailAddress, firstName, lastName }} onSubmit={this._onSubmitForm}/>
                </div>
            </div>
        )
    }
}

const AccountInformationForm = reduxForm({ enableReinitialize: true, form: 'AccountInformationForm' })(
    ({ error, handleSubmit, submitSucceeded }) => (
        <Form onSubmit={handleSubmit}>
            {submitSucceeded && !error && (
                <span className='text-success'>Successfully updated your account!</span>
            )}

            {error && (
                <span className='text-danger'>{error}</span>
            )}

            <Field addon='email' component={AccountInformationField} label='Email Address' name='emailAddress' type='email'/>
            <Field component={AccountInformationField} label='First Name' name='firstName' type='text'/>
            <Field component={AccountInformationField} label='Last Name' name='lastName' type='text'/>

            <Button type='submit' className='pull-right' primary>Submit</Button>
        </Form>
    )
)

const AccountInformationField = ({
    addon, input, label, meta: { active, touched, error }, type
}) => (
    <div className='input-group'>

        <span className='input-group-addon'>
            {addon ? (
                <i className='material-icons'>{addon}</i>
            ) : (
                <i className='material-icons'  style={{ visibility: 'hidden' }}>person</i>
            )}
        </span>

        <div className={classNames({
                'form-group label-floating': true,
                'is-empty': !input.value,
                'is-focused': active,
                'has-error': touched && error
            })}>
                <label className='control-label'>{label}{touched && error && ` - ${error}`}</label>
                <input
                    type={type}
                    className='form-control'
                    {...input}
                />
        </div>
    </div>
)

const mapStateToProps = (state, props) => {
    return {
        ...getCustomer(state),
        authenticationToken: state.auth.authenticationToken,
        customerToken: state.auth.anonymousCustomerToken || state.csr.csrCustomerToken
    }
}

const dispatchResolve = (resolver, props) => {
    if (!props.isFetching) {
        resolver.resolve(props.fetchCustomer)
    }
}

export default connect(mapStateToProps, { fetchCart, fetchCustomer })(resolve(dispatchResolve)(AccountInformation))
