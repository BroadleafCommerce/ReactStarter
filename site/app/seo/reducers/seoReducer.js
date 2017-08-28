import { createPagedFetchReducer } from 'core/util/refetch'

export default createPagedFetchReducer('seo', payload => payload.entityURI)
