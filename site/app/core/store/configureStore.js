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
