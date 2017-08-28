import { createSelector } from 'reselect'

export const getBreadcrumbs = createSelector(
    state => state.breadcrumbs,
    (_, props) => props.entityURI,
    (breadcrumbs, entityURI) => {
        const entityBreadcrumbs = breadcrumbs[entityURI]

        if (!entityBreadcrumbs || !entityBreadcrumbs.breadcrumbs) {
            return []
        }

        return entityBreadcrumbs.breadcrumbs
    }
)
