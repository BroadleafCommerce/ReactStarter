
export default function locale(state = { localeCode: undefined }, action) {
    if (action.payload && action.payload.localeCode) {
        return {
            ...state,
            localeCode: action.payload.localeCode
        }
    }
    return state
}
