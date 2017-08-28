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
