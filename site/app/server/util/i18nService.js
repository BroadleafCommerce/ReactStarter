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

const eagerlyFetchedLanguages = []

// Initialize Locale data
LOCALES.forEach((locale) => {
    const language = locale.substring(0, locale.indexOf('-'))
    if (!getLocaleData(language)) {
        localeData[language] = fs.readFileSync(path.join(process.cwd(), `node_modules/react-intl/locale-data/${language}.js`)).toString();
    }
    
    if (!getMessages(language) && !eagerlyFetchedLanguages.includes(language)) {
        eagerlyFetchedLanguages.push(language)
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
