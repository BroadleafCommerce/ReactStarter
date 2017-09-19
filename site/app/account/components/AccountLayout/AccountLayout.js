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
