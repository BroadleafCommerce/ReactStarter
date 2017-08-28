import React, { Component } from 'react'
import { Carousel } from 'react-responsive-carousel'
import isEmpty from 'lodash/isEmpty'

const ProductImagePicker = ({
    className,
    media = []
}) => (
    <div className={className}>
        <Carousel
            showArrows={false}
            showIndicators={true}
            showStatus={false}
            showThumbs={true}
            infiniteLoop={true}>
            {!isEmpty(media) && media.map((item, index) => (
                <img
                    key={index}
                    alt={item.altText}
                    src={item.url + '?browse'}/>
            ))}
        </Carousel>
    </div>
)

export default ProductImagePicker
