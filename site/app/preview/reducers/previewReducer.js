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
