
export const MessagePortalActionTypes = {
    Push: '@MessagePortal.Push',
    Pop: '@MessagePortal.Pop',
}

export const displayMessage = (text, style = 'success') => dispatch => {
    dispatch({
        type: MessagePortalActionTypes.Push,
        payload: {
            text,
            style,
        }
    })
    setTimeout(() => {
        dispatch({
            type: MessagePortalActionTypes.Pop,
        })
    }, 1500)
}
