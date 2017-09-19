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
import { compose, createStore, applyMiddleware } from 'redux'
import throttle from 'lodash/throttle'
import thunk from 'redux-thunk'
import rootReducer from 'core/reducers'
import middleware from 'core/middleware'
import {saveState} from 'core/store/persistStore'

export function configureStore(initialState) {
    let composeEnhancers = compose

    if (typeof window !== 'undefined'
        && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) {
        composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    }

    const store = createStore(
        rootReducer,
        {...initialState},
        composeEnhancers(
            applyMiddleware(...[ ...middleware, thunk ])
        )
    )

    // define a ReduxResolver which helps us manage the state isomorphically
    store.resolver = new ReduxResolver()

    if (module.hot) {
        // Enable Webpack hot module replacement for reducers
        module.hot.accept('core/reducers', () => {
          const nextRootReducer = require('core/reducers').default
          store.replaceReducer(nextRootReducer)
        })
    }

    if (typeof window !== 'undefined') {
        store.subscribe(throttle(() => {
            saveState(store.getState())
        }, 500))
    }

    return store
}

class ReduxResolver {
    constructor() {
        this.pending = [];
        this.initialRender = true;
    }

    resolve(...actions) {
        const [action, ...args] = actions;

        if (typeof window !== "undefined") {
            return action(...args);
        }

        if (!this.initialRender) {
            return undefined
        }

        this.pending = [...this.pending, {action, args}];
    }

    dispatchAll() {
        return Promise.all(this.pending.map(({action, args}) => action(...args)));
    }

    clear() {
        this.pending = [];
        this.initialRender = false;
    }
}
