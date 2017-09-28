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
