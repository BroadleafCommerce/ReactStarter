/*
 * #%L
 * React Site Starter
 * %%
 * Copyright (C) 2009 - 2017 Broadleaf Commerce
 * %%
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * 
 *       http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * #L%
 */
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
