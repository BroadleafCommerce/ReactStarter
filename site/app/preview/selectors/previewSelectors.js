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
import { createSelector } from 'reselect'
import { isCrossAppAuthenticated } from 'auth/selectors'
import find from 'lodash/find'

export const getCurrentSandbox = createSelector(
    [
        state => state.preview.availableSandboxes,
        state => state.preview.currentSandboxId,
    ],
    (availableSandboxes = [], currentSandboxId) => {
        if (!!currentSandboxId && !!availableSandboxes.length) {
            return find(availableSandboxes, { id: +currentSandboxId })
        }

        return undefined
    }
)

export const isPreviewing = createSelector(
    [
        state => state.preview.currentSandboxId,
        isCrossAppAuthenticated,
    ],
    (currentSandboxId, isCrossAppAuthenticated) => {
        return isCrossAppAuthenticated && !!currentSandboxId
    }
)

export const isShowingDeepLinks = createSelector(
    isPreviewing,
    state => state.preview.showDeepLinks,
    (previewing, showDeepLinks) => {
        return previewing && showDeepLinks
    }
)
