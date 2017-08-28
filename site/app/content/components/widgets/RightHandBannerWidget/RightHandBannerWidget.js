import React from 'react'
import { Link } from 'react-router-dom'

const RightHandBannerWidget = ({
    sc,
}) => (
    <Link to={sc.values.targetUrl}>
        <div className="card card-plain">
            <div className="card-image">
                <img src={sc.values.imageUrl}/>
            </div>
        </div>
    </Link>
)

export default RightHandBannerWidget
