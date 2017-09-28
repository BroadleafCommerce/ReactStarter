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
