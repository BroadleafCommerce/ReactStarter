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
import isEqual from 'lodash/isEqual'
import React, { PureComponent } from 'react'
import { NavLink, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { resolve } from 'core/decorator/reduxResolve'
import { FormattedHTMLMessage, FormattedMessage } from 'react-intl'
import { handleLogout } from 'auth/actions'
import { invalidateCart } from 'cart/actions'
import { fetchCustomer, fetchWishlist } from 'account/actions'
import { isAnonymous } from 'auth/selectors'
import { getCustomer } from 'account/selectors'
import { getItemCount } from 'cart/selectors'
import Navbar from 'material-kit/components/Navbar'
import Button from 'material-kit/components/Button'
import Accordion from 'material-kit/components/Accordion'
import MiniCart from 'cart/components/MiniCart'
import LocaleSelector from 'layout/components/LocaleSelector'
import classNames from 'classnames'
import './HeaderControls.scss'

class HeaderControls extends PureComponent {
    componentWillReceiveProps(nextProps) {
        if (!nextProps.customer || this.props.anonymous !== nextProps.anonymous) {
            nextProps.fetchCustomer(true)
            if (!nextProps.anonymous) {
                nextProps.fetchWishlist()
            }
        }
    }

    render() {
        const {
            className,
            anonymous,
            customer,
            location,
            history,
            handleLogout,
            invalidateCart,
        } = this.props



        if (anonymous) {
            return (
                <AnonymousControls
                    className={className}
                    location={location}/>
            )
        } else {
            return (
                <RegisteredControls
                    className={className}
                    customer={customer}
                    history={history}
                    handleLogout={handleLogout}
                    invalidateCart={invalidateCart}/>
            )
        }
    }
}

const AnonymousControls = ({
    className,
    location
}) => (
    <Navbar.Nav right styleName='HeaderControls' className={className}>
        <li>
            <NavLink to={{
                pathname: '/login',
                state: {
                    from: location
                }
            }}>
                <FormattedHTMLMessage
                    id='home.login'
                    description='Login text for the header'
                    defaultMessage='Login'/>
            </NavLink>
        </li>
        <LocaleSelector/>
        <li>
            <MiniCart/>
        </li>
    </Navbar.Nav>
)

const RegisteredControls = ({
    className,
    customer,
    handleLogout,
    history,
    invalidateCart,
}) => (
    <Navbar.Nav right styleName='HeaderControls' className={className}>
        <Accordion collapsed={true}>
            <MyProfileDropdownLink customer={customer} onLogout={() => Promise.all([handleLogout(), invalidateCart()]).then(() => history.push('/')) }/>
        </Accordion>
        <LocaleSelector/>
        <li>
            <MiniCart/>
        </li>
    </Navbar.Nav>
)

const MyProfileDropdownLink = ({
    collapsed,
    customer,
    onLogout,
    toggle
}) => (
    <li className={classNames({ 'dropdown': true, 'open': !collapsed })}>
        <a href='#' className='dropdown-toggle' onClick={e => {
            e.preventDefault()
            toggle()
        }}>
            <i className='material-icons'>account_circle</i>{customer.firstName}
        </a>
        <ul className='dropdown-menu' styleName='HeaderControls__accountActions' aria-expanded={!collapsed} onClick={e => toggle()}>
            <li>
                <NavLink to='/account'>My Profile</NavLink>
            </li>
            <li>
                <a
                    href='javascript:void(0);'
                    onClick={onLogout}>
                    <FormattedMessage
                        id='home.logout'
                        defaultMessage='Logout'
                    />
                </a>
            </li>
        </ul>
    </li>
)

const mapStateToProps = (state) => {
    return {
        anonymous: isAnonymous(state),
        customer: getCustomer(state)
    }
}

const dispatchResolve = (resolver, props) => {
    resolver.resolve(props.fetchCustomer)
    if (!props.anonymous) {
        resolver.resolve(props.fetchWishlist)
    }
}

export default withRouter(
    connect(mapStateToProps, { fetchCustomer, fetchWishlist, handleLogout, invalidateCart })(
        resolve(dispatchResolve)(HeaderControls)
    )
)
