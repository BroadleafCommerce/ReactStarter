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
import {connect} from 'react-redux'
import {Switch, Route, Redirect} from 'react-router-dom'
import SandboxRibbon from 'preview/components/SandboxRibbon'
import CsrRibbon from 'csr/components/CsrRibbon'
import FullPageLayout from 'layout/components/FullPageLayout'
import Category from 'catalog/category/components/Category'
import Product from 'catalog/product/components/Product'
import Search from 'catalog/search/components/Search'
import Cart from 'cart/components/Cart'
import Checkout from 'checkout/components/Checkout'
import LoginRegister from 'auth/components/LoginRegister'
import Home from 'page/home/components/Home'
import Confirmation from 'checkout/components/Confirmation'
import Account from 'account/components/Account'
import NotFound from 'layout/components/NotFound'
import { isAuthenticated, isAnonymous } from 'auth/selectors'

const PrivateRoute = connect((state) => {
    return {
        authenticated: isAuthenticated(state),
        anonymous: isAnonymous(state)
    }
})(
    ({ component: Component, ...rest, anonymous, authenticated }) => (
        <Route {...rest} render={props => (
            (authenticated && !anonymous) ? (
                <Component {...props}/>
            ) : (
                <Redirect to={{
                    pathname: '/login',
                    state: { from: props.location }
                }}/>
            )
        )}/>
    )
)

const Root = () => (
    <div>
        <SandboxRibbon/>
        <CsrRibbon/>
        <Switch>
            <PrivateRoute path='/account' component={Account}/>
            <Route path='/' render={() => (
                <FullPageLayout>
                    <Switch>
                        <Route path="/" exact render={props => <Home {...props}/>}/>
                        <Route path="/login" exact component={LoginRegister}/>
                        <Redirect from='/register' to='/login'/>
                        <Route path='/checkout/login' exact render={props => <LoginRegister isCheckoutLogin {...props}/>}/>
                        <Route path="/checkout" component={Checkout}/>
                        <Route path="/cart" exact render={props => <Cart {...props}/>}/>
                        <Route path="/confirmation/:orderNumber" render={props => <Confirmation {...props}/>}/>
                        <Route path="/browse/" exact render={props => <Search {...props}/>}/>
                        <Route path="/browse/:category" exact render={props => <Category {...props}/>}/>
                        <Route path="/browse/:category/:product" exact render={props => <Product {...props}/>}/>

                        {/* 404/NotFound page, must be LAST */}
                        <Route component={NotFound}/>
                    </Switch>
                </FullPageLayout>
            )}/>
        </Switch>
    </div>
)

export default Root
