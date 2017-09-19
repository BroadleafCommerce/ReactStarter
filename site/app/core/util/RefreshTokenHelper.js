/*
 * #%L
 * React Site Starter
 * %%
 * Copyright (C) 2009 - 2017 Broadleaf Commerce
 * %%
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * 
 *       http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
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
