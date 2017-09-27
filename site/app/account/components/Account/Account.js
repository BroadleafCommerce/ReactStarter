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
