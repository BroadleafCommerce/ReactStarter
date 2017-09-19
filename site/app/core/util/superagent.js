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
