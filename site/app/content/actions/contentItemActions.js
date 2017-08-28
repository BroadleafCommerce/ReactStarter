import { normalize, schema } from 'normalizr'
import request from 'core/util/superagent'
import { isPreviewing } from 'preview/selectors'

export const ContentItemActionTypes = {
    Request: '@ContentItem.Request',
    Success: '@ContentItem.Success',
    Failure: '@ContentItem.Failure',
}

const ContentItem = new schema.Entity('contentItems', { idAttribute: 'id' })

export const fetchContentItem = name => (dispatch, getState) => {
    const state = getState()
    return dispatch({
        types: [ ContentItemActionTypes.Request, ContentItemActionTypes.Success, ContentItemActionTypes.Failure ],
        payload: { name },
        callAPI: () =>
            request.get('/api/content')
                .query({ name })
                .query({ includeDeepLinks: isPreviewing(state) && state.preview.showDeepLinks })
                .set('Content-Type', 'application/json'),
        transform: response => {
            if (response.body) {
                const { entities, result } = normalize(response.body, ContentItem)

                return {
                    entities,
                    result,
                    receivedAt: Date.now()
                }
            }
        }

    })
}
