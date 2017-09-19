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
import { handleLogout } from 'auth/actions'
import Cookies from 'js-cookie'

export const PreviewActionTypes = {
    Sandboxes: {
        Request: '@Preview.Sandboxes.Request',
        Success: '@Preview.Sandboxes.Success',
        Failure: '@Preview.Sandboxes.Failure',
    },
    ChangeSandboxDate: '@Preview.ChangeSandboxDate',
    ClearSandbox: '@Preview.ClearSandbox',
    SelectSandbox: '@Preview.SelectSandbox',
    ToggleDeepLinks: '@Preview.ToggleDeepLinks',
    ToggleSearchScore: '@Preview.ToggleSearchScore',
}

export const fetchSandboxes = () => (dispatch, getState) => {
    return dispatch({
        types: [ PreviewActionTypes.Sandboxes.Request, PreviewActionTypes.Sandboxes.Success, PreviewActionTypes.Sandboxes.Failure ],
        callAPI: () => request.get('/api/sandboxselect'),
        transform: response => {
            if (response.body) {
                return {
                    availableSandboxes: response.body,
                    receivedAt: Date.now()
                }
            }
        }
    })
}

export const changeSandboxDate = sandboxDateTime => {
    return {
        type: PreviewActionTypes.ChangeSandboxDate,
        payload: {
            sandboxDateTime,
        }
    }
}

export const clearSandbox = () => (dispatch, getState) => {
    Cookies.remove('preview_currentSandboxId', {path: '/'})
    Cookies.remove('preview_sandboxDateTime', {path: '/'})
    dispatch(handleLogout())
    dispatch({ type: PreviewActionTypes.ClearSandbox })
    return Promise.resolve()
}

export const selectSandbox = id => ({ type: PreviewActionTypes.SelectSandbox, payload: { id } })

export const toggleDeepLinks = () => ({ type: PreviewActionTypes.ToggleDeepLinks })

export const toggleSearchScore = () => ({ type: PreviewActionTypes.ToggleSearchScore })
