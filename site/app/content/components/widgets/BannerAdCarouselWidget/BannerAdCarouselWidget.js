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
import React from 'react'
import { withRouter } from 'react-router-dom'
import { Carousel } from 'react-responsive-carousel'
import './BannerAdCarouselWidget.scss'

const BannerAdCarouselWidget = ({
    history,
    mcs,
    scs,
}) => (
    <div styleName='BannerAdCarouselWidget'>
        <Carousel
            onClickItem={(index, link) => history.push(link.props.to)}
            showStatus={false}
            showThumbs={false}
            infiniteLoop={true}>
            {scs.filter(sc => sc.values.imageUrl && sc.values.targetUrl).map(sc => (
                <div key={sc.id} to={sc.values.targetUrl} style={{ cursor: 'pointer' }}>
                    <img
                        styleName='BannerAdCarouselWidget__image'
                        src={sc.values.imageUrl}/>
                </div>
            ))}
        </Carousel>
        <div styleName='BannerAdCarouselWidget__headerContainer'>
            {mcs.map(mc => [
                <div styleName='BannerAdCarouselWidget__header'>{mc.values.header}</div>,
                <div styleName='BannerAdCarouselWidget__subheading'>{mc.values.subheading}</div>
            ])}
        </div>
    </div>
)

export default withRouter(BannerAdCarouselWidget)
