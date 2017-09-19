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
import symbol from 'currency-symbol-map'
import {formatMoney} from 'accounting'

export const format = (amount, currency = 'USD', pattern) => {
    if (amount && amount.amount) {
        return formatMoney(amount.amount, {symbol : symbol(amount.currency || currency), format : pattern || '%s%v'}, 2)
    }

    return formatMoney(amount, {symbol : symbol(currency), format : pattern || '%s%v'}, 2)
}

export const add = (a, b) => {
    return {
        amount: parseFloat(a.amount) + parseFloat(b.amount),
        currency: a.currency || b.currency
    }
}
