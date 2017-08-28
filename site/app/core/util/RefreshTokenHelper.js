import request from 'core/util/superagent'
import { createAcceptTokenAction, createLogoutAction } from 'auth/actions'

class RefreshTokenHelper {
    constructor() {
        this.promise = undefined
        this.done = true
    }

    waitForTokenRefresh = (store) => {
        if (this.done) {
            this.done = false;
            this.promise = request.get('/api/refresh-token')
                .then(response => {
                    // If we get a valid response, then we need to accept the new access token.
                    store.dispatch(createAcceptTokenAction(response.headers.authorization))
                    this.done = true;
                }, () => {
                    // If we do not get a valid response, then we need to clear the authentication state.
                    // This will always be hit if there is server-side rendering of an application with an expired jwt token.
                    // Currently there is not reliable support for refreshing the token from the NodeJS server.
                    store.dispatch(createLogoutAction())
                    this.done = true;
                })
        }

        return this.promise
    }
}

export default new RefreshTokenHelper()
