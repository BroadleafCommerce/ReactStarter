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
