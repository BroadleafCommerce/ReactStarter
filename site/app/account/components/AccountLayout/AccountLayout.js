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
import { Helmet } from 'react-helmet'
import AccountMenu from 'account/components/AccountMenu'
import Navbar from 'material-kit/components/Navbar'
import Menu from 'menu/components/Menu'
import Header from 'layout/components/Header'
import Footer from 'layout/components/Footer'
import MessagePortal from 'layout/components/MessagePortal'
import './AccountLayout.scss'

const AccountLayout = ({ children }) => (
    <div styleName='AccountLayout'>
        <Helmet titleTemplate='Heat Clinic - %s'>
            <title>Account</title>
            <meta name='description' content='Account'/>
        </Helmet>

        <Navbar styleName='AccountLayout__navbar' fixed top >
            <div styleName='AccountLayout__navbarContainer' className='container-fluid'>
                <Header styleName='AccountLayout__header'/>
                <Menu menuName="Header Nav"/>
            </div>
        </Navbar>
        <section className='main' styleName='AccountLayout__content' role="main">
            <div className='section'>
                <div className='container'>
                    <AccountMenu />

                    <div className='col-sm-9'>
                        <div className='card' styleName='AccountLayout__formWrapper'>
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <MessagePortal/>

        <Footer/>
    </div>
)

export default AccountLayout
