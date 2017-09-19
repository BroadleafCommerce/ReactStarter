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
