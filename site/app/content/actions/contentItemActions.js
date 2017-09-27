/*
 * #%L
 * React Site Starter
 * %%
 * Copyright (C) 2009 - 2017 Broadleaf Commerce
 * %%
 * Broadleaf Commerce React Starter
 * 
 * Written in 2017 by Broadleaf Commerce info@broadleafcommerce.com
 * 
 * To the extent possible under law, the author(s) have dedicated all copyright and related and neighboring rights to this software to the public domain worldwide. This software is distributed without any warranty.
 * You should have received a copy of the CC0 Public Domain Dedication along with this software. If not, see <http://creativecommons.org/publicdomain/zero/1.0/>.
 * 
 * Please Note - The scope of CC0 Public Domain Dedication extends to Broadleaf Commerce React Starter demo application alone. Linked libraries (including all Broadleaf Commerce Framework libraries) are subject to their respective licenses, including the requirements and restrictions specified therein.
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
