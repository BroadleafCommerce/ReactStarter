import React from 'react'
import './DeepLinks.scss'

const DeepLinks = ({ children, deepLinks }) => (
    <div styleName='DeepLinks'>
        <div styleName='DeepLinks__content'>
            {deepLinks.map((deepLink, index) => (
                <a target='_blank' key={index} href={deepLink.fullUrl} styleName='DeepLinks__content__link'>{deepLink.displayText}</a>
            ))}
        </div>
        {children}
    </div>
)

export default DeepLinks
