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
    ReactDOM.render(
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
