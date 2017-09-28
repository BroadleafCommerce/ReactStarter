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
