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
