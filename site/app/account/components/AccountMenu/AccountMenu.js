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
