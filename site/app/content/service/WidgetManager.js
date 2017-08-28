import BannerAdCarouselWidget from 'content/components/widgets/BannerAdCarouselWidget'
import HomeMiddlePromoWidget from 'content/components/widgets/HomeMiddlePromoWidget'
import RightHandBannerWidget from 'content/components/widgets/RightHandBannerWidget'
import RightHandRelatedProductWidget from 'content/components/widgets/RightHandRelatedProductWidget'

const widgets = {
    BANNER_AD_CAROUSEL: BannerAdCarouselWidget,
    HOME_MIDDLE_PROMO: HomeMiddlePromoWidget,
    RIGHT_HAND_BANNER: RightHandBannerWidget,
    RIGHT_HAND_RELATED: RightHandRelatedProductWidget,
}

export default {
    get: type => {
        return widgets[type]
    }
}
