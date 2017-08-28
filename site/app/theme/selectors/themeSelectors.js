import { createSelector } from 'reselect'
import isEmpty from 'lodash/isEmpty'
import reduce from 'lodash/reduce'

export const getThemeFields = createSelector(
    state => state.theme,
    (_, props) => props.fieldNames,
    (themeFields, fieldNames) => {
        if (isEmpty(themeFields) || isEmpty(fieldNames)) {
            return {}
        }

        return reduce(
            fieldNames,
            (result, fieldName) => ({
                ...result,
                [fieldName]: themeFields[fieldName].value
            }),
            {}
        )
    }
)
