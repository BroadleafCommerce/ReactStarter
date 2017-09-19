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
import {CartActionTypes} from 'cart/actions'
import {CheckoutActionTypes} from 'checkout/actions'

const initialState = {
    isFetching : undefined,
    lastFetched: undefined,
    id : undefined,
    orderNumber : undefined,
    status : undefined,
    totalTax : {},
    totalShipping : {},
    subTotal : {},
    total : {},
    itemCount : 0,
    customer : {},
    orderItem : [],
}

export const cart = (state = initialState, action) => {
    switch(action.type) {
        case CartActionTypes.Fetch.Request:
        case CartActionTypes.Add.Request:
        case CartActionTypes.Remove.Request:
        case CartActionTypes.Update.Request:
        case CartActionTypes.SaveEmail.Request:
        case CartActionTypes.AddPromo.Request:
        case CartActionTypes.RemovePromo.Request:
        case CheckoutActionTypes.SaveBilling.Request:
        case CheckoutActionTypes.RemovePayment.Request:
        case CheckoutActionTypes.SaveFulfillment.Request:
        return {
            ...state,
            isFetching : true,
        }
        case CartActionTypes.Fetch.Success:
        case CartActionTypes.Add.Success:
        case CartActionTypes.Remove.Success:
        case CartActionTypes.Update.Success:
        case CartActionTypes.SaveEmail.Success:
        case CartActionTypes.AddPromo.Success:
        case CartActionTypes.RemovePromo.Success:
        case CheckoutActionTypes.SaveBilling.Success:
        case CheckoutActionTypes.RemovePayment.Success:
        case CheckoutActionTypes.SaveFulfillment.Success:
        return {
            ...state,
            ...action.payload.cart,
            isFetching : false,
            lastFetched: action.payload.receivedAt,
        }
        case CartActionTypes.Fetch.Failure:
        case CartActionTypes.Add.Failure:
        case CartActionTypes.Remove.Failure:
        case CartActionTypes.Update.Failure:
        case CartActionTypes.SaveEmail.Failure:
        case CartActionTypes.AddPromo.Failure:
        case CartActionTypes.RemovePromo.Failure:
        case CheckoutActionTypes.SaveBilling.Failure:
        case CheckoutActionTypes.RemovePayment.Failure:
        case CheckoutActionTypes.SaveFulfillment.Failure:
        return {
            ...state,
            isFetching : false,
            error : action.payload.error,
        }
        case CartActionTypes.Invalidate:
        return initialState
        case CartActionTypes.Accept:
        return {
            ...state,
            ...action.payload.cart,
            isFetching: false,
            lastFetched: action.payload.receivedAt,
        }
        default:
        if (action.payload && action.payload.cart) {
            return {
                ...state,
                ...action.payload.cart,
                lastFetched: action.payload.receivedAt,
            }
        }
        return state
    }
}

export const miniCart = (state = { isOpened: false }, action) => {
    switch(action.type) {
        case CartActionTypes.MiniCart.Show:
        return {
            ...state,
            isOpened: true
        }
        case CartActionTypes.MiniCart.Hide:
        return {
            ...state,
            isOpened: false
        }
        default:
        return state
    }
}
