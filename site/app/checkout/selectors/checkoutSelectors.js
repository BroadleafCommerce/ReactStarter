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
            creditCard: isEmpty(creditCard) ? storedCreditCard : creditCard,
            shouldSaveNewPayment,
            shouldUseShippingAddress,
        }
    }
)
