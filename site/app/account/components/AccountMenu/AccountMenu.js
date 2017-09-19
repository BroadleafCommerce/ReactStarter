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
