import React from 'react'
import {connect} from 'react-redux'
import Portal from 'react-portal'
import './MessagePortal.scss'

const MessagePortal = ({
    messages = [],
}) => (
    <Portal
        closeOnEsc
        isOpened={!!messages.length}>
        <div styleName='MessagePortal'>
            {messages.map((message, index) => (
                <div key={index} styleName={`MessagePortal__content--${message.style}`}>
                    <div styleName='MessagePortal__content__message'>
                        {message.text}
                    </div>
                </div>
            ))}
        </div>
    </Portal>
)

const mapStateToProps = state => ({
    messages: state.messagePortal.messages,
})

export default connect(mapStateToProps)(MessagePortal)
