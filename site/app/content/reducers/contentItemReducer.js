import { ContentItemActionTypes } from 'content/actions'

const contentItems = (state = {
    isFetching: false,
    lastFetched: undefined,
    contentItemId: undefined,
}, action) => {
    switch(action.type) {
        case ContentItemActionTypes.Request:
        return {
            ...state,
            isFetching: true,
        }
        case ContentItemActionTypes.Success:
        return {
            ...state,
            isFetching: false,
            lastFetched: action.payload.receivedAt,
            contentItemId: action.payload.result,
        }
        case ContentItemActionTypes.Failure:
        return {
            ...state,
            isFetching: false,
        }
        default:
        return state
    }
}

const contentItemsByZone = (state = {}, action) => {
    switch(action.type) {
        case ContentItemActionTypes.Request:
        case ContentItemActionTypes.Success:
        case ContentItemActionTypes.Failure:
        return {
            ...state,
            [action.payload.name] : contentItems(state[action.payload.name], action)
        }
        default:
        return state
    }
}

export default contentItemsByZone
