import Cookies from 'js-cookie'
import queryString from 'query-string'
import { initialState as previewInitialState } from 'preview/reducers'
import { initialState as csrInitialState } from 'csr/reducers'

//TODO ensure all cookies have the secure flag for production
export const saveState = state => {
    const { auth, csr, locale, preview } = state

    let expires = new Date()
    expires.setTime(expires.getTime() + 10*60*1000)

    if (auth.authenticationToken) {
        Cookies.set('auth_authenticationToken', auth.authenticationToken, {expires, path : '/'})

        if (preview.currentSandboxId) {
            Cookies.set('preview_currentSandboxId', preview.currentSandboxId, {expires, path: '/'})

            if (preview.sandboxDateTime) {
                Cookies.set('preview_sandboxDateTime', preview.sandboxDateTime, {expires, path: '/'})
            }
        }

        if (csr.csrCustomerToken) {
            Cookies.set('csr_csrCustomerToken', csr.csrCustomerToken, {expires, path: '/'})

            if (csr.csrCartId) {
                Cookies.set('csr_csrCartId', csr.csrCartId, {expires, path: '/'})
            }
        }
    }

    if (auth.anonymousCustomerToken) {
        Cookies.set('auth_anonymousCustomerToken', auth.anonymousCustomerToken, {expires, path : '/'})
    }

    if (locale && locale.localeCode) {
        Cookies.set('blLocale', locale.localeCode, {expires, path: '/'})
    }
}

export const loadState = (location, locale) => {
    let state = {}

    const query = queryString.parse(location.search)

    const authenticationToken = Cookies.get('auth_authenticationToken')
    const anonymousCustomerToken = Cookies.get('auth_anonymousCustomerToken') || query.anonymousCustomerToken
    const isCrossApp = JSON.parse(Cookies.get('auth_isCrossApp') || false)

    if (authenticationToken) {
        state.auth = {
            authenticationToken,
            isCrossApp,
        }

        const currentSandboxId = Cookies.get('preview_currentSandboxId') || query.blSandboxId
        if (currentSandboxId) {
            state.preview = {
                ...previewInitialState,
                currentSandboxId,
            }

            const sandboxDateTime = Cookies.get('preview_sandboxDateTime')
            if (sandboxDateTime) {
                state.preview.sandboxDateTime = sandboxDateTime
            }
        }

        const csrCustomerToken = Cookies.get('csr_csrCustomerToken') || query.csrCustomerToken
        const csrCartId = Cookies.get('csr_csrCartId')
        if (csrCustomerToken) {
            state.csr = {
                ...csrInitialState,
                csrCustomerToken,
                csrCartId
            }
        }
    }

    if (anonymousCustomerToken) {
        state.auth = {
            ...state.auth,
            anonymousCustomerToken,
        }
    }

    if (locale) {
        state.locale = {
            localeCode: locale
        }
    }

    return state
}

export const loadStateServer = (req, locale) => {
    let state = {}

    const authenticationToken = req.cookies['auth_authenticationToken']
    const anonymousCustomerToken = req.cookies['auth_anonymousCustomerToken'] || req.query.anonymousCustomerToken
    const isCrossApp = req.cookies['auth_isCrossApp'] || false

    if (authenticationToken) {
        state.auth = {
            authenticationToken,
            isCrossApp,
        }

        const currentSandboxId = req.cookies['preview_currentSandboxId'] || req.query.blSandboxId
        if (currentSandboxId) {
            state.preview = {
                ...previewInitialState,
                currentSandboxId,
            }

            const sandboxDateTime = req.cookies['preview_sandboxDateTime']
            if (sandboxDateTime) {
                state.preview.sandboxDateTime = sandboxDateTime
            }
        }

        const csrCustomerToken = req.cookies['csr_csrCustomerToken'] || req.query.csrCustomerToken
        const csrCartId = req.cookies['csr_csrCartId']
        if (csrCustomerToken) {
            state.csr = {
                ...csrInitialState,
                csrCustomerToken,
                csrCartId
            }
        }
    }

    if (anonymousCustomerToken) {
        state.auth = {
            ...state.auth,
            anonymousCustomerToken,
        }
    }

    if (locale) {
        state.locale = {
            localeCode: locale
        }
    }

    return state
}
