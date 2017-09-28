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
import { createSelector } from 'reselect'
import { formValueSelector } from 'redux-form'
import isEqual from 'lodash/isEqual'
import isEmpty from 'lodash/isEmpty'
import find from 'lodash/find'
import omit from 'lodash/omit'

// need to select address and fulfillmentOptionId
export const getInitialShippingValues = createSelector(
    state => state.cart.fulfillmentGroup,
    (fulfillmentGroup) => {
        if (!fulfillmentGroup) {
            return {}
        }

        const shippableFulfillmentGroup = find(fulfillmentGroup, fg => !['DIGITAL', 'GIFT_CARD', 'PHYSICAL_PICKUP'].includes(fg.fulfillmentType))

        const { address, fulfillmentOption, ...rest } = shippableFulfillmentGroup

        return {
            ...rest,
            address: {
                ...address,
                isoCountryAlpha2: {
                    alpha2: 'US'
                },
            },
            fulfillmentOption: {
                id: fulfillmentOption && `${fulfillmentOption.id}` || undefined
            }
        }
    }
)

const formSelector = formValueSelector('CreditCardMethodForm')

export const getInitialCreditCardValues = createSelector(
    state => state.cart.payment,
    state => state.cart.fulfillmentGroup,
    state => formSelector(state, 'address', 'creditCard', 'shouldSaveNewPayment', 'shouldUseShippingAddress'),
    state => state.storedPayment,
    (payment, fulfillmentGroup, { address, creditCard, shouldSaveNewPayment, shouldUseShippingAddress }, storedCreditCard) => {

        let billingAddress = omit(address, ['isoCountryAlpha2'])

        if (payment) {
            const defaultPayment = find(payment, { gatewayType: 'Temporary' })
            if (defaultPayment) {
                billingAddress = defaultPayment && defaultPayment.billingAddress
            }
        }

        if (shouldUseShippingAddress) {
            const shippableFulfillmentGroup = find(fulfillmentGroup, fg => !['DIGITAL', 'GIFT_CARD', 'PHYSICAL_PICKUP'].includes(fg.fulfillmentType))

            if (shippableFulfillmentGroup && isEmpty(billingAddress)) {
                billingAddress = omit(shippableFulfillmentGroup.address, ['id', 'phonePrimary.id', 'customerAddressId', 'customerAddressName'])
            }
        }

        return {
            address: {
                ...billingAddress,
                isoCountryAlpha2: {
                    alpha2: 'US'
                },
            },
            creditCard: !isEmpty(creditCard) ? creditCard : {
                creditCardNumber: '4111111111111111',
                creditCardExpDate: '01/99',
                creditCardCvv: '123',
                ...storedCreditCard,
            },
            shouldSaveNewPayment,
            shouldUseShippingAddress,
        }
    }
)
