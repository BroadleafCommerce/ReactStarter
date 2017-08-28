import { PreviewActionTypes } from 'preview/actions'

export const initialState = {
    currentSandboxId: undefined,
    availableSandboxes: [],
    isFetchingSandboxes: false,
    lastFetchedSandboxes: undefined,
    sandboxDateTime: undefined,
    showDeepLinks: true,
    showSearchScore: false,
}

const preview = (state = initialState, action) => {
    switch(action.type) {
        case PreviewActionTypes.Sandboxes.Request:
        return {
            ...state,
            isFetchingSandboxes: true,
        }
        case PreviewActionTypes.Sandboxes.Success:
        return {
            ...state,
            isFetchingSandboxes: false,
            availableSandboxes: action.payload.availableSandboxes,
            lastFetchedSandboxes: action.payload.receivedAt,
        }
        case PreviewActionTypes.Sandboxes.Failure:
        return {
            ...state,
            isFetchingSandboxes: false,
        }
        case PreviewActionTypes.SelectSandbox:
        return {
            ...state,
            currentSandboxId: action.payload.id,
        }
        case PreviewActionTypes.ChangeSandboxDate:
        return {
            ...state,
            sandboxDateTime: action.payload.sandboxDateTime,
        }
        case PreviewActionTypes.ClearSandbox:
        return initialState
        case PreviewActionTypes.ToggleDeepLinks:
        return {
            ...state,
            showDeepLinks: !state.showDeepLinks,
        }
        case PreviewActionTypes.ToggleSearchScore:
        return {
            ...state,
            showSearchScore: !state.showSearchScore,
        }
        default:
        return state
    }
}

export default preview
