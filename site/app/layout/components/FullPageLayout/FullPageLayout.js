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
import { connect } from 'react-redux'
import { isCsrMode } from 'csr/selectors'
import { isPreviewing } from 'preview/selectors'
import Menu from 'menu/components/Menu'
import Header from 'layout/components/Header'
import Footer from 'layout/components/Footer'
import MessagePortal from 'layout/components/MessagePortal'
import Navbar from 'material-kit/components/Navbar'
import './FullPageLayout.scss'

export const FullPageLayout = ({
    children,
    csrMode,
    previewing,
}) => (
    <div styleName='FullPageLayout'>
        <Navbar styleName={!previewing && !csrMode ? 'FullPageLayout__navbar' : 'FullPageLayout__navbar--preview'} fixed top >
            <div styleName='FullPageLayout__navbarContainer' className='container-fluid'>
                <Header/>
                <Menu menuName="Header Nav"/>
            </div>
        </Navbar>
        <section className='main' styleName='FullPageLayout__content' role="main">
            {children}
        </section>

        <MessagePortal/>

        <Footer/>
    </div>
)

const mapStateToProps = (state) => {
    return {
        csrMode: isCsrMode(state),
        previewing: isPreviewing(state)
    }
}

export default connect(mapStateToProps)(FullPageLayout)
