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
