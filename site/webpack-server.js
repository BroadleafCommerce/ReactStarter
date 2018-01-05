var path = require('path');
var opn = require('opn');
var chalk = require('chalk');
var webpack = require('webpack');
var express = require('express');
var cookieParser = require('cookie-parser');
var proxy = require('express-http-proxy')
var devMiddleware = require('webpack-dev-middleware');
var hotMiddleware = require('webpack-hot-middleware');
var config = require('./webpack.config');
var renderFullPage = require('./app/server/render').renderFullPage;
var crossAppAuth = require('./app/server/crossAppAuth')
var i18nService = require('./app/server/util/i18nService')
var urljoin = require('url-join');

var app = express();

app.use(cookieParser());

var compiler = webpack(config);

var devWebpackMiddleware = devMiddleware(compiler, {
    publicPath: config.output.publicPath,
    historyApiFallback: true,
    hot: true,
    quiet: true,
})

app.use(devWebpackMiddleware);

app.use(hotMiddleware(compiler, {
    log: false,
    heartbeat: 2000,
}));

app.use('/cmsstatic', proxy(process.env.IMAGE_HOST, {
    preserveHostHdr: true,
    proxyReqPathResolver : function(req) {
        return urljoin(process.env.API_CONTEXT_PATH, 'cmsstatic', req.url)
    }
}));
app.use('/img', proxy(process.env.IMAGE_HOST, {
    preserveHostHdr: true,
    proxyReqPathResolver : function(req) {
        return urljoin(process.env.API_CONTEXT_PATH, 'img', req.url)
    }
}));
app.use('/api', proxy(process.env.API_HOST, {
    preserveHostHdr: true,
    proxyReqPathResolver : function(req) {
        return urljoin(process.env.API_CONTEXT_PATH, req.url)
    }
}));

app.get('/favicon.ico', (req, res) => {
    res.send('favicon missing')
});

app.get('/crossappsessioninvalidate', crossAppAuth)

app.get(`/messages/:locale.json`, (req, res) => {
    res.json(i18nService.getMessages(req.params.locale))
})

app.get('*', function (req, res) {
    const locale = i18nService.detectLocale(req)
    res.cookie('blLocale', locale, { path: '/', maxAge: (new Date() * 0.001) + (365 * 24 * 3600) });
    res.send(renderFullPage('', {}, locale));
});

var port = process.env.PORT || 3000
var uri = 'http://localhost:' + port 

app.listen(3000, function (err) {
    if (err) {
        return console.error(err);
    }

    console.log(chalk.green('> Starting dev server'));
    devWebpackMiddleware.waitUntilValid(() => {
        console.log(chalk.green('> Listening at ' + uri + '\n'));
        opn(uri)
    });
});
