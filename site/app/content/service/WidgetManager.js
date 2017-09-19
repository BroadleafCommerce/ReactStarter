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
