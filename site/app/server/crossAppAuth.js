var request = require('superagent')
var path = require('path')

function clearExistingAuthenticationCookies(res) {
    res.clearCookie('auth_authenticationToken', { path: '/' })
    res.clearCookie('auth_isCrossApp', { path: '/' })
    res.clearCookie('auth_anonymousCustomerToken', { path: '/' })
    res.clearCookie('preview_currentSandboxId', { path: '/' })
    res.clearCookie('csr_csrCustomerToken', { path: '/' })
    res.clearCookie('csr_csrCartId', { path: '/' })
}

function authenticateCrossApp(blAuthToken, blAdminUserId) {
    return new Promise(function(resolve, reject) {
        if (!blAuthToken) {
            return reject('No security token')
        }

        if (!blAdminUserId) {
            return reject('No admin user id')
        }

        // POST to /api/v1/crossappauth
        request.post(process.env.API_HOST + path.join(process.env.API_CONTEXT_PATH, 'crossappauth'))
            .query({
                blAdminUserId: blAdminUserId,
                blAuthToken: blAuthToken,
            })
            .end(function(err, response) {
                if (err) {
                    return reject(err)
                }

                if (response.body) {
                    // the response body should be the authorization token
                    resolve(response.body)
                }
            })
    })
}

function fetchRedirectInformation(forwardUrl, authorizationToken) {
    return new Promise(function(resolve, reject) {
        if (!forwardUrl) {
            return reject('No forwardUrl provided')
        }

        if (!authorizationToken) {
            return reject('No authorization token provided')
        }

        // request to forwardUrl
        request.get(process.env.API_HOST + path.join(process.env.API_CONTEXT_PATH, forwardUrl))
            .set('Authorization', authorizationToken)
            .end(function(err, response) {
                if (err) {
                    return reject(err)
                }

                if (response.body) {
                    // the response body should be a url
                    resolve(response.body || '/')
                }
            })
    })
}

module.exports = function(req, res) {
    // 1. Clear current authentication related cookies
    clearExistingAuthenticationCookies(res)

    // 2. POST to `/api/v1/crossappauth` with security token
    var authPromise = authenticateCrossApp(req.query.blAuthToken, req.query.blAdminUserId)

    authPromise.then( function(authorizationToken) {
        // 3. request the redirect path
        var redirectPromise = fetchRedirectInformation(req.query.forwardUrl, authorizationToken)

        redirectPromise.then( function(redirectUrl) {
            // 4. Store new authorization token in cookies
            res.cookie('auth_authenticationToken', authorizationToken, { path: '/' })
            res.cookie('auth_isCrossApp', true, { path: '/' })
            res.redirect(redirectUrl)
        }, function(err) {
            console.log(err)
            res.status(500).send('Error with fetching redirect information')
        })
    }, function(err) {
        console.log(err)
        res.status(500).send('Error with cross app authentication')
    })
}
