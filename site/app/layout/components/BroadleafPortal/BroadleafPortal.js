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
