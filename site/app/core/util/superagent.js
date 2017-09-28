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
import request from 'superagent'

const __CLIENT__ = typeof window !== 'undefined' && window !== null

export default {
    get(url) {
        if (__CLIENT__) {
            return request.get(url)
        } else {
            return request.get(`${process.env.API_HOST}${url.replace('/api/', process.env.API_CONTEXT_PATH)}`)
        }
    },

    post(url) {
        if (__CLIENT__) {
            return request.post(url)
        } else {
            return request.post(`${process.env.API_HOST}${url.replace('/api/', process.env.API_CONTEXT_PATH)}`)
        }
    },

    patch(url) {
        if (__CLIENT__) {
            return request.patch(url)
        } else {
            return request.patch(`${process.env.API_HOST}${url.replace('/api/', process.env.API_CONTEXT_PATH)}`)
        }
    },

    put(url) {
        if (__CLIENT__) {
            return request.put(url)
        } else {
            return request.put(`${process.env.API_HOST}${url.replace('/api/', process.env.API_CONTEXT_PATH)}`)
        }
    },

    del(url) {
        if (__CLIENT__) {
            return request.delete(url)
        } else {
            return request.delete(`${process.env.API_HOST}${url.replace('/api/', process.env.API_CONTEXT_PATH)}`)
        }
    }
}
