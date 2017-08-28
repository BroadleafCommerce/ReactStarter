import { createSelector } from 'reselect'

export const getPageSeoProperties = createSelector(
    state => state.seo,
    (_, props) => props.location.pathname,
    (seo, entityURI) => {
        if (!seo[entityURI]) {
            return {}
        }

        return seo[entityURI].seo || {}
    }
)

export const getProductSeoProperties = createSelector(
    state => state.seo,
    (_, props) => `/${props.match.params.category}/${props.match.params.product}`,
    (seo, entityURI) => {
        if (!seo[entityURI]) {
            return {}
        }

        return seo[entityURI].seo || {}
    }
)

export const getCategorySeoProperties = createSelector(
    state => state.seo,
    (_, props) => `/${props.match.params.category}`,
    (seo, entityURI) => {
        if (!seo[entityURI]) {
            return {}
        }

        return seo[entityURI].seo || {}
    }
)
