import {PageActionTypes} from 'page/common/actions'

const pageByUrl = (state = {}, action) => {
    switch(action.type) {
        case PageActionTypes.Get.Request:
        case PageActionTypes.Get.Success:
        case PageActionTypes.Get.Failure:
        return {
            ...state,
            [action.payload.url] : page(state[action.payload.url], action)
        }
        default:
        return state
    }
}

const page = (state = {
    isFetching: false,
    lastFetched: undefined,
    pageFields: {}
}, action) => {
    switch(action.type) {
        case PageActionTypes.Get.Request:
        return {
            ...state,
            isFetching: true,
        }
        case PageActionTypes.Get.Success:
        return {
            ...state,
            ...action.payload.page,
            isFetching: false,
            lastFetched: action.payload.receivedAt,
        }
        case PageActionTypes.Get.Failure:
        return {
            ...state,
            isFetching: false,
        }
        default:
        return state
    }
}

export default pageByUrl
