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
import React, { Component } from 'react'
import Portal from 'react-portal'
import './BroadleafPortal.scss'

class BroadleafPortal extends Component {
    static defaultProps = {
        className: undefined,
        closeOnEsc: true,
        closeOnOutsideClick: false,
        isOpened: undefined,
        onClose: undefined,
        openByClickOn: undefined,
    }

    render() {
        const { className, closeOnEsc, closeOnOutsideClick, isOpened, onClose, openByClickOn } = this.props
        return (
            <Portal closeOnEsc={closeOnEsc} closeOnOutsideClick={closeOnOutsideClick} isOpened={isOpened} onClose={onClose} openByClickOn={openByClickOn}>
                <Overlay>
                    <Container className={className}>
                        {this.props.children}
                    </Container>
                </Overlay>
            </Portal>
        )
    }
}

const Overlay = ({ children, closePortal }) => (
    <div styleName='Overlay' onClick={closePortal}>
        {React.cloneElement(children, { closePortal })}
    </div>
)

const Container = ({ className, children, closePortal }) => (
    <div styleName='Container' className={className} onClick={e => e.stopPropagation() && false}>
        {React.cloneElement(children, { closePortal })}
    </div>
)

export default BroadleafPortal
