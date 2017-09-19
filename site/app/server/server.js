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
import 'babel-polyfill'
import path from 'path'
import express from 'express'
import cookieParser from 'cookie-parser'
import proxy from 'express-http-proxy'
import request from 'core/util/superagent'
import React from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router'
import { Provider } from 'react-redux'
import { IntlProvider } from 'react-intl'
import { configureStore } from 'core/store/configureStore'
import { loadStateServer } from 'core/store/persistStore'
import { renderFullPage } from 'server/render'
import crossAppAuth from 'server/crossAppAuth'
import i18nService from 'server/util/i18nService'
import Root from 'core/components/Root'

let app = express()
app.use(cookieParser())

app.get('*.js', function (req, res, next) {
    if (req.url.startsWith('/static')) {
        req.url = req.url + '.gz';
        res.set('Content-Encoding', 'gzip');
        res.set('Content-Type', 'text/javascript');
    }
    next();
});

app.get('*.css', function(req, res, next) {
    if (req.url.startsWith('/static')) {
        req.url = req.url + '.gz';
        res.set('Content-Encoding', 'gzip');
        res.set('Content-Type', 'text/css');
    }
    next();
});

app.use('/static', express.static(path.join(__dirname, 'static')))
app.use('/vendor', express.static(path.join(__dirname, 'vendor')))

app.use('/cmsstatic', proxy(process.env.IMAGE_HOST, {
    preserveHostHdr: true,
    forwardPath : function(req) {
        return `${process.env.API_CONTEXT_PATH}cmsstatic${req.url}`
    }
}));
app.use('/img', proxy(process.env.IMAGE_HOST, {
    preserveHostHdr: true,
    forwardPath : function(req) {
        return `${process.env.API_CONTEXT_PATH}img${req.url}`
    }
}));
app.use('/api', proxy(process.env.API_HOST, {
    preserveHostHdr: true,
    forwardPath : function(req) {
        return `${process.env.API_CONTEXT_PATH}${req.url}`
    }
}));

app.get('/crossappsessioninvalidate', crossAppAuth)

app.get('/favicon.ico', (req, res) => {
    res.send('favicon missing')
});

app.get(`/messages/:locale.json`, (req, res) => {
    res.json(i18nService.getMessages(req.params.locale))
})

app.get('*', (req, res) => {
    const locale = i18nService.detectLocale(req)
    res.cookie('blLocale', locale, { path: '/', maxAge: (new Date() * 0.001) + (365 * 24 * 3600) });
    const store = configureStore(loadStateServer(req, locale))
    const context = {}

    const initialNow = Date.now()
    const initialComponents = (
        <IntlProvider initialNow={initialNow} locale={locale} messages={i18nService.getMessages(locale)}>
            <Provider store={store}>
                <StaticRouter
                location={req.url}
                context={context}>
                    <Root/>
                </StaticRouter>
            </Provider>
        </IntlProvider>
    )

    // render the first time
    let markup = renderToString(initialComponents)

    // the result will tell you if it redirected, if so, we ignore
    // the markup and send a proper redirect.
    if (context.url) {
        res.writeHead(302, {
            Location: context.url
        })
        res.end()
    } else {

        store.resolver.dispatchAll()
            .then(results => {
                store.resolver.clear()
                markup = renderToString(initialComponents)
                res.send(renderFullPage(markup, store.getState(), locale, initialNow))
            }).catch(err => {
                throw err
            })
    }
})

app.use((err, req, res, next) => {
    if (res.headersSent) {
        return next(err)
    }

    console.trace(err)
    res.status(500)
    res.render('error', { error: err })
})

app.listen(process.env.PORT || 3000)
