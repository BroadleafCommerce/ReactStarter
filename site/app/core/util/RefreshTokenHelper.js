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
