import formatDate from 'date-fns/format'
import RefreshTokenHelper from 'core/util/RefreshTokenHelper'

const apiMiddleware = store => next => action => {
    const { callAPI, types, payload = {}, transform, options, ...rest } = action

    if (!callAPI) {
        return next(action)
    }

    const [REQUEST, SUCCESS, FAILURE] = types
    next({ ...rest, payload, type : REQUEST })

    const handleFailedRequest = error => next({ ...rest, payload : { ...payload, error}, type : FAILURE })

    const apiRequestCall = makeAPIRequest(callAPI, store, options)
    return apiRequestCall()
        .then(response => response, error => {
            if (error.response.statusCode === 401 && error.response.body.message.includes('EXPIRED_ACCESS_TOKEN')) {
                return RefreshTokenHelper.waitForTokenRefresh(store).then(apiRequestCall)
            }

            return Promise.reject(error)
        })
        .then(transform)
        .then(result => next({ ...rest, payload : { ...payload, ...result }, type : SUCCESS }), handleFailedRequest)
}

const makeAPIRequest = (callAPI, store, options = { includeAuthentication: true, includeSandboxId: true }) => () => {
    const apiRequest = callAPI()

    const { auth, csr, locale, preview } = store.getState()
    const { includeAuthentication = true, includeSandboxId = true } = options

    if (includeAuthentication) {
        if (auth.authenticationToken) {
            apiRequest.set('Authorization', auth.authenticationToken || null)
        }
        if (auth.anonymousCustomerToken) {
            apiRequest.set('X-Customer-Token', auth.anonymousCustomerToken || null)
        }
        if (csr.csrCustomerToken) {
            apiRequest.set('X-Customer-Token', csr.csrCustomerToken || null)

            if (csr.csrCartId) {
                apiRequest.set('X-Override-Cart-Id', csr.csrCartId || null)
            }
        }
    }

    if (includeSandboxId) {
        apiRequest.query({ blSandboxId: preview.currentSandboxId })

        if (preview.sandboxDateTime) {
            apiRequest.query({ blSandboxDateTime: formatDate(preview.sandboxDateTime, 'YMMDDHHmm') })
        }
    }

    if (locale) {
        apiRequest.set('X-Locale', locale.localeCode)
    }

    return apiRequest
}

export default apiMiddleware
