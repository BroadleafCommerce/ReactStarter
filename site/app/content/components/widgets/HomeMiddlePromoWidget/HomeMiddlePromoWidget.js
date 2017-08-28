import React from 'react'
import { Link } from 'react-router-dom'
import './HomeMiddlePromoWidget.scss'

const HomeMiddlePromoWidget = ({
    sc
}) => (
    <div className='row text-center' dangerouslySetInnerHTML={{ __html: sc.values.htmlContent }}></div>
)

export default HomeMiddlePromoWidget
