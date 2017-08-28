import { createSelector } from 'reselect'
import { formValueSelector } from 'redux-form'
import find from 'lodash/find'

export const getProductForView = createSelector(
    (state, props) => state.product[`${props.match.params.category}/${props.match.params.product}`],
    state => state.entities.products,
    (meta, products) => {
        if (!meta || !meta.id) {
            return { isFetching: true }
        }

        return {
            ...meta,
            ...products[meta.id]
        }
    }
)

export const getConfigureItemRequest = createSelector(
    (state, props) => state.configureItem[props.id],
    (result) => {
        if (!result) {
            return undefined
        }

        return result.configureItemRequest
    },
)

export const isConfiguringItem = createSelector(
    (state, props) => state.configureItem[props.id],
    result => {
        return !!result && !!result.configureItemRequest
    }
)

export const isFetchingConfiguration = createSelector(
    (state, props) => state.configureItem[props.id],
    result => {
        return !!result && result.isFetchingItem
    }
)
