var i18nService = require('./util/i18nService')
var Helmet = require('react-helmet').Helmet

function renderFullPage(html, state = {}, locale, initialNow = Date.now()) {
    const helmet = Helmet.renderStatic()
    return `
    <html ${helmet.htmlAttributes.toString()}>
    <head>
        ${helmet.title.toString()}
        ${helmet.meta.toString()}
        <meta charset="utf-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
        <meta name="author" content="Broadleaf Commerce" />

        <meta content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0' name='viewport' />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="stylesheet" type="text/css" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Roboto+Slab:400,700|Material+Icons" />
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/latest/css/font-awesome.min.css" />
        <link rel="stylesheet" href="/vendor/css/bootstrap.css">
        <link rel="stylesheet" href="/vendor/css/carousel.css">
        <link rel="stylesheet" href="/api/theme/css/material-kit.css">
        <link rel="stylesheet" href="/api/theme/css/material-kit-extensions.css">
        ${process.env.RENDER_ENV === 'server' ? '<link rel="stylesheet" href="/static/styles.css">' : ''}
    </head>
    <body>
        <div id=root>${html}</div>
        <script>
        window.__PRELOADED_STATE__ = ${JSON.stringify(state)}
        </script>
        <script type="application/javascript">window.I18N_MESSAGES=${JSON.stringify(i18nService.getMessages(locale))}</script>
        <script type="application/javascript">${i18nService.getLocaleData(locale)}</script>
        <script type="application/javascript">window.INITIAL_NOW=${JSON.stringify(initialNow)}</script>
        <script src="https://cdn.polyfill.io/v2/polyfill.min.js?features=Intl.~locale.${locale}"></script>
        <script src="/static/bundle.js"></script>
    </body>
    </html>
    `
}

module.exports = {renderFullPage}
