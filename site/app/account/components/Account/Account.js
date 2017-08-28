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
