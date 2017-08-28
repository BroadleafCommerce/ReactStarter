import request from 'core/util/superagent'

export const PageActionTypes = {
    Get: {
        Request: '@Page.Get.Request',
        Success: '@Page.Get.Success',
        Failure: '@Page.Get.Failure',
    }
}

//TODO: add caching
export const fetchPageByUrl = url => (dispatch, getState) => {
    const {page} = getState()
    if (page[url] && page[url].isFetching) {
        return Promise.resolve()
    }
    return dispatch({
        types: [ PageActionTypes.Get.Request, PageActionTypes.Get.Success, PageActionTypes.Get.Failure ],
        payload: { url },
        options: { includeAuthentication: true },
        callAPI: () =>
            request.get(`/api/page`)
                .query({ url }),
        transform: response => {
            if (response.body) {
                return {
                    url,
                    page: response.body,
                    receivedAt: Date.now()
                }
            }
        }
    })
}
