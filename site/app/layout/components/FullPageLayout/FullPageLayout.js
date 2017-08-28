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
