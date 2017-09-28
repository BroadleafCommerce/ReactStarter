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
import { Field, Form, reduxForm, SubmissionError } from 'redux-form'
import { connect } from 'react-redux'
import Button from 'material-kit/components/Button'
import request from 'core/util/superagent'
import classNames from 'classnames'

class ChangePassword extends PureComponent {
    static propTypes = {
        authenticationToken: PropTypes.string,
        customerToken: PropTypes.string,
    }

    _onSubmitForm = form => {
        const { authenticationToken, customerToken } = this.props
        return new Promise((resolve, reject) => {
            request.post('/api/customer/password')
                .set('Authorization', authenticationToken)
                .set('X-Customer-Token', customerToken || null)
                .send(form)
                .end((err, response) => {
                    if (err) {
                        return reject(err)
                    }


                    resolve(response)
                })
        }).then(() => {
            this.changePasswordForm.reset()
        }, err => {
            throw new SubmissionError({
                _error: 'Password change failed! Please try again.'
            })
        })
    }

    render() {
        return (
            <div>
                <h3>Change Password</h3>
                <hr />
                <div className='col-sm-9 col-md-6'>
                    <ChangePasswordForm ref={ref => this.changePasswordForm = ref} onSubmit={this._onSubmitForm}/>
                </div>
            </div>
        )
    }
}

const ChangePasswordForm = reduxForm({
    form: 'ChangePasswordForm',
    validate: form => {
        const errors = {}
        if (!form.currentPassword) {
            errors.currentPassword = 'Required'
        }

        if (!form.newPassword) {
            errors.newPassword = 'Required'
        }

        if (!form.newPasswordConfirm) {
            errors.newPasswordConfirm = 'Required'
        } else if (form.newPassword !== form.newPasswordConfirm) {
            errors.newPasswordConfirm = 'Passwords do not match'
        }

        return errors
    }
})(
    ({ error, handleSubmit, submitSucceeded }) => (
        <Form onSubmit={handleSubmit}>
            {submitSucceeded && !error && (
                <span className='text-success'>Successfully updated your password!</span>
            )}

            {error && (
                <span className='text-danger'>{error}</span>
            )}

            <Field addon='lock' component={ChangePasswordField} label='Current Password' name='currentPassword' type='password'/>
            <Field component={ChangePasswordField} label='New Password' name='newPassword' type='password'/>
            <Field component={ChangePasswordField} label='Confirm Password' name='newPasswordConfirm' type='password'/>

            <Button type='submit' className='pull-right' primary>Submit</Button>
        </Form>
    )
)

const ChangePasswordField = ({
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
        authenticationToken: state.auth.authenticationToken,
        customerToken: state.auth.anonymousCustomerToken || state.csr.csrCustomerToken
    }
}

export default connect(mapStateToProps)(ChangePassword)
