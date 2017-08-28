import { createSelector } from 'reselect'
import sortBy from 'lodash/sortBy'

export const getFulfillmentEstimations = createSelector(
    state => state.fulfillment.isFetching,
    state => state.fulfillment.estimations,
    (fetchingEstimations, estimations) => {
        if (fetchingEstimations) {
            return []
        }

        return sortBy(estimations, 'fulfillmentOption.id')
    }
)
