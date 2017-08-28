import { createSelector } from 'reselect'
import isEmpty from 'lodash/isEmpty'

export const getContentData = createSelector(
    (state, props) => state.contentItemsByZone[props.name] || {},
    state => state.entities.contentItems,
    (metadata, contentItems) => {
        if (!metadata.contentItemId) {
            return { isFetching: metadata.isFetching }
        }

        const contentItem = contentItems[metadata.contentItemId]

        return {
            component: contentItem.component,
            deepLinks: contentItem.deepLinks,
            isFetching: metadata.isFetching,
            sc: !isEmpty(contentItem.scs) && contentItem.scs[0] || {},
            scs: contentItem.scs,
            mcs: contentItem.mcs
        }
    }
)
