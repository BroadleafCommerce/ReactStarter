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
