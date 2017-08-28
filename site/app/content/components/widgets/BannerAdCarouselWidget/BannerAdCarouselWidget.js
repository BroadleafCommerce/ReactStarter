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
