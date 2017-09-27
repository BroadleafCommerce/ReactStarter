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
