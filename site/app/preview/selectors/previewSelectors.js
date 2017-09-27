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
