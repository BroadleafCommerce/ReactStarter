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
import request from 'core/util/superagent'

export const PageActionTypes = {
    Get: {
        Request: '@Page.Get.Request',
        Success: '@Page.Get.Success',
        Failure: '@Page.Get.Failure',
    }
}

//TODO: add caching
export const fetchPageByUrl = url => (dispatch, getState) => {
    const {page} = getState()
    if (page[url] && page[url].isFetching) {
        return Promise.resolve()
    }
    return dispatch({
        types: [ PageActionTypes.Get.Request, PageActionTypes.Get.Success, PageActionTypes.Get.Failure ],
        payload: { url },
        options: { includeAuthentication: true },
        callAPI: () =>
            request.get(`/api/page`)
                .query({ url }),
        transform: response => {
            if (response.body) {
                return {
                    url,
                    page: response.body,
                    receivedAt: Date.now()
                }
            }
        }
    })
}
