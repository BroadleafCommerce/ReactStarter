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
import { createFetchAction } from 'core/util/refetch'

export const ThemeActionTypes = {
    GetFields: {
        Request: '@Theme.GetFields.Request',
        Success: '@Theme.GetFields.Success',
        Failure: '@Theme.GetFields.Failure'
    }
}

const fetchThemeFieldsAction = (...fieldNames) => ({
    types: [ ThemeActionTypes.GetFields.Request, ThemeActionTypes.GetFields.Success, ThemeActionTypes.GetFields.Failure ],
    payload: { fieldNames },
    callAPI: () => request.get('/api/theme/fields').query({ fieldNames }),
    transform: response => ({
        fields: response.body,
        receivedAt: Date.now()
    })
})

export const fetchThemeFields = (...fieldNames) => (dispatch, getState) => {
    if (!fieldNames.length) {
        throw new Error('No fields provided to fetchThemeFields');
    }

    const { theme } = getState()

    const missingFieldNames = fieldNames.filter(fieldName => !theme[fieldName])
    if (!missingFieldNames.length) {
        return Promise.resolve({})
    }
    
    return dispatch(fetchThemeFieldsAction(...missingFieldNames))
}
