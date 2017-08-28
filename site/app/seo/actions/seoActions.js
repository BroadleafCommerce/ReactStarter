import { createFetchAction } from 'core/util/refetch'
import request from 'core/util/superagent'

const SEO_CACHE_TIME = 1000*60

const fetchSeoPropertiesAction = createFetchAction(
    'seo',
    payload => request.get('/api/seo').query({ entityType: payload.entityType, entityURI: payload.entityURI })
)

export const fetchSeoProperties = payload => (dispatch, getState) => {
    const { seo } = getState()
    const { entityURI } = payload
    if (seo[entityURI] && !seo[entityURI].isFetching && ( Date.now() - seo[entityURI].lastFetched < SEO_CACHE_TIME )) {
        return Promise.resolve()
    }
    return dispatch(fetchSeoPropertiesAction(payload))
}
