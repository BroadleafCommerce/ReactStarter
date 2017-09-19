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
