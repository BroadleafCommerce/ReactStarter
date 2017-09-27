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
import { Route, Link } from 'react-router-dom'
import Accordion from 'material-kit/components/Accordion'
import './AccountMenu.scss'

const AccountLink = ({ children, exact, to }) => {
    return (
        <Route path={to} exact={exact}>
            {({ match }) => (
                <li className={match ? 'active' : ''}>
                    <Link to={to}>
                        {children}
                    </Link>
                </li>
            )}
        </Route>
    )
}

const AccountMenu = ({ collapsed, toggle }) => (
    <div className='col-sm-3'>
        <div className='card card-nav-tabs' styleName='AccountMenu'>
            <h4 className='text-center' styleName='AccountMenu__header'>
                <span>Account Options</span>
                <a  styleName='AccountMenu__collapse'
                    onClick={e => {
                        e.preventDefault()
                        toggle()
                    }}>
                    <i className='material-icons'>arrow_drop_down_circle</i>
                </a>
            </h4>
            <div style={{ display: !collapsed ? 'block' : 'none' }}>
                <hr/>
                <ul className='nav nav-pills nav-primary nav-stacked'>
                    <AccountLink to='/account' exact>Account Info</AccountLink>
                    <AccountLink to='/account/orders'>View Orders</AccountLink>
                    <AccountLink to='/account/wishlist' exact>Manage Wishlist</AccountLink>
                    <AccountLink to='/account/password' exact>Change Password</AccountLink>
                    <AccountLink to='/account/addresses'>Manage Addresses</AccountLink>
                    <AccountLink to='/account/payments'>Manage Payments</AccountLink>
                </ul>
            </div>
        </div>

    </div>
)

const AccordionAccountMenu = () => (
    <Accordion collapsed={false}>
        <AccountMenu/>
    </Accordion>
)

export default AccordionAccountMenu
