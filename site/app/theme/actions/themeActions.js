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
