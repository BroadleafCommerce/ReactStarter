import { createPagedFetchReducer } from 'core/util/refetch'

export default createPagedFetchReducer(
    'breadcrumbs',
    ({ entityURI }) => entityURI
)
