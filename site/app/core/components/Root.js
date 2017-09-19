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
