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
import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { addLocaleData, IntlProvider } from 'react-intl';
import { configureStore } from 'core/store/configureStore'
import { loadState } from 'core/store/persistStore'
import { AppContainer } from 'react-hot-loader'
import Root from 'core/components/Root'
import ScrollToTop from 'core/components/ScrollToTop'
import merge from 'lodash/merge'
import request from 'core/util/superagent'
import Cookie from 'js-cookie'

const locale = Cookie.get('blLocale') || 'en-US'
const preloadedState = merge(window.__PRELOADED_STATE__, loadState(window.location, locale))
const store = configureStore(preloadedState)

const messages = window.I18N_MESSAGES
const language = locale.substring(0, locale.indexOf('-'))
addLocaleData(window.ReactIntlLocaleData[locale] || window.ReactIntlLocaleData[language])

const render = Component => {
    const reactDOMRender = process.env.NODE_ENV === 'development' ? ReactDOM.render : ReactDOM.hydrate
    reactDOMRender(
        <AppContainer>
            <IntlProvider initialNow={parseInt(window.INITIAL_NOW, 10)} locale={locale} messages={messages}>
                <Provider store={store}>
                    <BrowserRouter>
                        <Component/>
                    </BrowserRouter>
                </Provider>
            </IntlProvider>
        </AppContainer>,
        document.querySelector('#root')
    )

}

render(Root)

if (module.hot) {
  module.hot.accept('core/components/Root', () => {
    // If you use Webpack 2 in ES modules mode, you can
    // use <Root /> here rather than require() a <NextApp />.
    const NextApp = require('core/components/Root').default;
    render(NextApp)
  });
}
