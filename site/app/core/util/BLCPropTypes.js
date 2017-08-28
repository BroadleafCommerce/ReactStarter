import React from 'react'
export default {
    ...React.PropTypes,
    money : React.PropTypes.shape({
        amount: React.PropTypes.oneOfType([
            React.PropTypes.number,
            React.PropTypes.string,
        ]).isRequired,
        currency: React.PropTypes.string.isRequired,
    }),
    media : React.PropTypes.shape({
        id: React.PropTypes.number.isRequired,
        title: React.PropTypes.string,
        url: React.PropTypes.string.isRequired,
        altText: React.PropTypes.string,
        tags: React.PropTypes.string,
    })
}
