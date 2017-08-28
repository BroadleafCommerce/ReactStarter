import request from 'core/util/superagent'
import { createFetchAction } from 'core/util/refetch'

export const fetchBreadcrumbs = createFetchAction(
    'breadcrumbs',
    ({ entityURI, entityType }) => request.get('/api/breadcrumbs').query({ entityURI, entityType })
)
