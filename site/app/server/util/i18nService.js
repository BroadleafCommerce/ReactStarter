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
var { addLocaleData } = require('react-intl')
var fs = require('fs')
var path = require('path')
var request = require('superagent')

var en = require('react-intl/locale-data/en');
var es = require('react-intl/locale-data/es');
var fr = require('react-intl/locale-data/fr');

const acceptLanguage = require('accept-language')
const LOCALES = ['en-US', 'en-GB', 'es-MX', 'es-ES', 'fr-FR']

addLocaleData([...fr, ...es, ...en]);
acceptLanguage.languages(LOCALES);

function detectLocale(req) {
  const cookieLocale = req.cookies.blLocale

  return acceptLanguage.get(cookieLocale || req.headers['accept-language']) || 'en-US'
}

const messages = {}
const localeData = {}

function getLocaleData(locale) {
    if (localeData[locale]) {
        return localeData[locale]
    }

    const language = locale.substring(0, locale.indexOf('-'))
    return localeData[language]
}

function getMessages(locale) {
    if (messages[locale]) {
        return messages[locale]
    }

    const language = locale.substring(0, locale.indexOf('-'))
    return messages[language]
}

// Initialize Locale data
LOCALES.forEach((locale) => {
    const language = locale.substring(0, locale.indexOf('-'))
    if (!getLocaleData(language)) {
        localeData[language] = fs.readFileSync(path.join(process.cwd(), `node_modules/react-intl/locale-data/${language}.js`)).toString();
    }

    if (!getMessages(language)) {
        request.get(`${process.env.API_HOST}${process.env.API_CONTEXT_PATH}messages/${language}.json`).then(response => {
            messages[language] = response.body
        })
    }
});

module.exports = {
    detectLocale: detectLocale,
    getLocaleData: getLocaleData,
    getMessages: getMessages,
    localeData: localeData,
    messages: messages,
}
