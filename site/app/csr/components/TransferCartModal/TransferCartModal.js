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
import {reduxForm} from 'redux-form'
import FormModal from 'layout/components/FormModal'
import { Field, FieldGroup } from 'layout/components/Field'
import './TransferCartModal.scss'

class TransferCartModal extends Component {
    render() {
        const { isOpened, handleSubmit, onClose, reset } = this.props
        return (
            <FormModal
                isOpened={isOpened}
                onClose={() => {
                    reset()
                    onClose()
                }}
                handleSubmit={handleSubmit}>
                <div styleName='TransferCartModal'>
                    <h2 styleName='TransferCartModal__header'>
                        Transfer Anonymous Cart
                    </h2>
                    <FieldGroup>
                        <Field label='Customer Email Address' name='emailAddress' type='email' />
                    </FieldGroup>
                    <button
                        styleName='TransferCartModal__submit'
                        type='submit'>
                        Transfer Cart
                    </button>
                </div>
            </FormModal>
        )
    }
}

TransferCartModal = reduxForm({
    form: 'TransferCartModal',
})(TransferCartModal)

export default TransferCartModal
