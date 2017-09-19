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
