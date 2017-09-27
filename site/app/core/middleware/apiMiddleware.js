/*
 * #%L
 * React Site Starter
 * %%
 * Copyright (C) 2009 - 2017 Broadleaf Commerce
 * %%
 * Broadleaf Commerce React Starter
 * 
 * Written in 2017 by Broadleaf Commerce info@broadleafcommerce.com
 * 
 * To the extent possible under law, the author(s) have dedicated all copyright and related and neighboring rights to this software to the public domain worldwide. This software is distributed without any warranty.
 * You should have received a copy of the CC0 Public Domain Dedication along with this software. If not, see <http://creativecommons.org/publicdomain/zero/1.0/>.
 * 
 * Please Note - The scope of CC0 Public Domain Dedication extends to Broadleaf Commerce React Starter demo application alone. Linked libraries (including all Broadleaf Commerce Framework libraries) are subject to their respective licenses, including the requirements and restrictions specified therein.
 * #L%
 */
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
