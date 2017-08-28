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
