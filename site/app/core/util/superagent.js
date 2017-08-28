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
