import {MessagePortalActionTypes} from 'layout/actions'

const messagePortal = (state = {
    messages : []
}, action) => {
    switch(action.type) {
        case MessagePortalActionTypes.Push:
        return {
            ...state,
            messages: [...state.messages, {
                text: action.payload.text,
                style: action.payload.style,
            }]
        }
        case MessagePortalActionTypes.Pop:
        return {
            ...state,
            messages: state.messages.slice(1) || []
        }
        default:
        return state
    }
}

export default messagePortal
