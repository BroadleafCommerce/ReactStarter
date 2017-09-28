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
