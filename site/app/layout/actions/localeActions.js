export const setLocale = localeCode => (dispatch, getState) => {
    dispatch({
        type: 'LOCALE',
        payload: { localeCode }
    })
    location.reload()
}
