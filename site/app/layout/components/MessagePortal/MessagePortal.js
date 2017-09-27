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
