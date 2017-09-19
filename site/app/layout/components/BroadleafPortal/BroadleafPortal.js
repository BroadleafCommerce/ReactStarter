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
