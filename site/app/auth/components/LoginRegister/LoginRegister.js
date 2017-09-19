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
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { handleLogin, handleRegister } from 'auth/actions'
import { fetchCart, saveEmailForCart } from 'cart/actions'
import { SubmissionError } from 'redux-form'
import { Helmet } from 'react-helmet'
import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'
import CheckoutAsGuestForm from './CheckoutAsGuestForm'
import Button from 'material-kit/components/Button'
import './LoginRegister.scss'

class LoginRegister extends PureComponent {

    static defaultProps = {
        isCheckoutLogin: false
    }

    state = {
        redirectToReferrer: false
    }

    _handleLoginSubmit = form => {
        const { username, password } = form
        return this.props.handleLogin(username, password)
        .then(action => {
            if (action.payload.error) {
                throw new SubmissionError({_error: 'The e-mail address and/or password entered do not match our records. Please try again'})
            } else {
                // we need to fetch a new cart for our new authenticated user
                this.props.fetchCart(true)

                // redirect to our referrer
                // TODO: There is a bug here when a cross app auth user trys to log in,
                // due to the sandbox ribbon causing the app to unmount, there
                // is no direct fix other than either supporting login as cross app user,
                // or changing sandbox ribbon to not be a wrapper
                this.setState({
                    redirectToReferrer: true
                })
            }
        })
    }

    _handleRegisterSubmit = form => {
        return this.props.handleRegister(form)
        .then(action => {
            if (action.payload.error) {
                throw new SubmissionError({_error: 'Registering an account with the information provided failed. Please try again'})
            } else {
                // we need to fetch a new cart for our new authenticated user
                this.props.fetchCart(true)

                // redirect to the referrer
                this.setState({
                    redirectToReferrer: true
                })
            }
        })
    }

    _handleCheckoutAsGuest = form => {
        return this.props.saveEmailForCart(form.emailAddress)
        .then(action => {
            if (action.payload.error) {
                throw new SubmissionError({_error: 'Unable to checkout with the given email address.'})
            } else {
                // redirect to the referrer
                this.setState({
                    redirectToReferrer: true
                })
            }
        })
    }

    render() {
        const { from } = this.props.location.state || { from : { pathname : '/' }}
        const { redirectToReferrer } = this.state

        if (redirectToReferrer) {
            return (
                <Redirect to={from}/>
            )
        }

        const { isCheckoutLogin } = this.props

        return (
            <div className='container'>
                <Helmet titleTemplate='Heat Clinic - %s'>
                    <title>Login</title>
                    <meta name='description' content='Login and Register'/>
                </Helmet>
                
                <div className='section'>
                    <div className='row row-centered'>
                        <div id='login' className='col-sm-5 col-centered'>
                            <LoginForm onSubmit={this._handleLoginSubmit}/>
                        </div>
                        <div className='col-sm-1 col-centered hidden-xs'>
                            <div styleName='col-centered-separator'></div>
                        </div>
                        <div id='register' className='col-sm-5 col-centered'>
                            {!isCheckoutLogin ? (
                                <RegisterForm onSubmit={this._handleRegisterSubmit}/>
                            ) : (
                                <CheckoutAsGuestForm onSubmit={this._handleCheckoutAsGuest}/>
                            )}

                        </div>

                    </div>
                </div>
            </div>
        )
    }
}

export default connect(null, { fetchCart, handleLogin, handleRegister, saveEmailForCart })(LoginRegister)
