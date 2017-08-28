import { createSelector } from 'reselect'

export const getRatingSummaryForProduct = createSelector(
    (state, props) => state.ratingSummaryByProduct[props.productId],
    state => state.entities.ratingSummaries,
    (meta, ratingSummaries) => {
        if (!meta || !meta.id) {
            return {}
        }

        return {
            ...meta,
            ...ratingSummaries[meta.id]
        }
    }
)
