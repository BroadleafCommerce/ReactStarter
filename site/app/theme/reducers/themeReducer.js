import { ThemeActionTypes } from 'theme/actions'
import reduce from 'lodash/reduce'

const theme = (state = {}, action) => {
    switch(action.type) {
        case ThemeActionTypes.GetFields.Request:
        return reduce(
            action.payload.fieldNames,
            (result, fieldName) => {
                return {
                    ...result,
                    [fieldName]: {
                        isFetching: true,
                    }
                }
            },
            state
        )
        case ThemeActionTypes.GetFields.Success:
        return reduce(
            action.payload.fieldNames,
            (result, fieldName) => {
                return {
                    ...result,
                    [fieldName]: {
                        isFetching: false,
                        lastFetched: action.payload.receivedAt,
                        value: action.payload.fields[fieldName]
                    }
                }
            },
            state
        )
        case ThemeActionTypes.GetFields.Failure:
        return reduce(
            action.payload.fieldNames,
            (result, fieldName) => {
                return {
                    ...result,
                    [fieldName]: {
                        isFetching: false,
                    }
                }
            },
            state
        )
        return
        default:
        return state
    }
}

export default theme
