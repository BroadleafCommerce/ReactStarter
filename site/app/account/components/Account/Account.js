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
import { Route, Switch } from 'react-router-dom'
import AccountLayout from 'account/components/AccountLayout'
import AccountInformation from 'account/components/AccountInformation'
import ViewOrders from 'account/components/ViewOrders'
import ManageWishlist from 'account/components/ManageWishlist'
import ChangePassword from 'account/components/ChangePassword'
import ManageAddresses from 'account/components/ManageAddresses'
import ManagePayments from 'account/components/ManagePayments'

const Account = () => (
    <AccountLayout>
        <Switch>
            <Route path='/account' exact render={props => <AccountInformation {...props}/>}/>
            <Route path='/account/orders' render={props => <ViewOrders {...props}/>}/>
            <Route path='/account/wishlist' exact render={props => <ManageWishlist {...props}/>}/>
            <Route path='/account/password' exact render={props => <ChangePassword {...props}/>}/>
            <Route path='/account/addresses' render={props => <ManageAddresses {...props}/>}/>
            <Route path='/account/payments' render={props => <ManagePayments {...props}/>}/>
        </Switch>
    </AccountLayout>
)

export default Account
