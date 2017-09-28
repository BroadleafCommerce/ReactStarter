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
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
import find from 'lodash/find'
import get from 'lodash/get'
import set from 'lodash/set'
import { Field, FieldGroup } from 'layout/components/Field'
import FormModal from 'layout/components/FormModal'
import { format } from 'layout/util/moneyUtils'
import './OverrideItemPriceModal.scss'

class OverrideItemPriceModal extends Component {
    render() {
        const { isOpened, handleSubmit, orderItem, onClose, reasonCodes, reset } = this.props
        return (
            <FormModal
                isOpened={isOpened}
                onClose={() => {
                    reset()
                    onClose()
                }}
                handleSubmit={handleSubmit}>
                <div styleName='OverrideItemPriceModal'>
                    <h2 styleName='OverrideItemPriceModal__header'>
                        Override Item Price for {orderItem.name}
                    </h2>
                    <FieldGroup>
                        <Field
                            props={{
                                disabled: true,
                                placeholder: format(orderItem.averagePrice.amount, orderItem.averagePrice.currency),
                            }}
                            label='Original Price'
                            name='originalPrice'
                            type='text'/>
                    </FieldGroup>
                    <FieldGroup>
                        <Field label='Override Price' name='overridePrice' type='text' />
                    </FieldGroup>
                    <FieldGroup>
                        <Field label='Reason' name='reasonCode' type='select'>
                            {reasonCodes.map(reasonCode => (
                                <option key={reasonCode.type} value={reasonCode.type}>{reasonCode.friendlyType}</option>
                            ))}
                        </Field>
                    </FieldGroup>
                    <FieldGroup>
                        <Field label='Message' name='message' type='text'/>
                    </FieldGroup>
                    <button
                        styleName='OverrideItemPriceModal__submit'
                        type='submit'>
                        Override Price
                    </button>
                </div>
            </FormModal>
        )
    }
}

OverrideItemPriceModal = reduxForm({
    form: 'OverrideItemPriceModal',
    initialValues: {
        reasonCode: 'PRICE_MATCH',
    },
    validate: (values, props) => {
        const { reasonCodes } = props
        const errors = {}

        const reasonCodeType = get(values, 'reasonCode')
        if (!!reasonCodeType) {
            const reasonCode = find(reasonCodes, { type: reasonCodeType })
            if (!!reasonCode && !get(values, 'message') && reasonCode.requiresMessage) {
                set(errors, 'message', `A message is required for reason code ${reasonCode.friendlyType}`)
            }
        } else {
            set(errors, 'reasonCode', 'Must select a reason for this change')
        }

        if (!get(values, 'overridePrice')) {
            set(errors, 'overridePrice', 'Must specify an override price for this item')
        }

        return errors
    }
})(OverrideItemPriceModal)

const mapStateToProps = (state, props) => {
    return {
        reasonCodes: state.csr.reasonCodes,
    }
}

export default connect(mapStateToProps)(OverrideItemPriceModal)
