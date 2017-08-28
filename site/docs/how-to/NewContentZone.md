# How to Add a new Content Zone

> Note: This document is only relevant if you have the AdvancedCMS module included.

This document is a walkthrough on how to add a new Content Zone to a React Broadleaf Application.
For this example, we are going to be walking through the process of adding a new
Content Zone to the top of the category and search result pages.

## The Problem

Before we start writing any code, it is important to have understand the problem
we are trying to solve and to design a plan or process to solve it.

The problem we have is that our marketing team wants to have a short
banner ad above the category result pages that stretches the width of the page.
Here is where they told us they want that ad to go:

![ad](https://cl.ly/032L3O3l1n3s/[d2f72a682e6163e730016c8ce1c0f1e9]_Image%202017-06-21%20at%2012.10.15%20PM.png)

We are going to tackle this problem with the following steps:

1. Design as a basic React component
2. Create a ContentItem in the admin
3. Refactor component into a Widget and render a ContentZone

## Design the basic component

The best way to solve a problem in programming is to first do the most expedient
solution and then optimize/refactor to make it better. The same applies to building
React components. Our first task is to write a basic React component that will look
exactly like our final result, but isn't yet connected to the content API.

I'm going to start this out by creating a new component, `ResultBannerAd`, and
rendering it at the top of my existing `ResultWrapper` component.

#### ResultWrapper.js

```js
import React from 'react'
import ResultBannerAd from 'catalog/search/components/ResultBannerAd'
import ResultWrapperHeader from 'catalog/search/components/ResultWrapperHeader'
import ResultWrapperFooter from 'catalog/search/components/ResultWrapperFooter'

export const ResultWrapper = ({
    children,
    isLoading,
    headerTitle,
    location,
    metadata,
}) => (
    <section id="result-wrapper">
        <ResultBannerAd imageUrl='/img/result-banner-bogo.png' targetUrl='/browse/hot-sauces'/>
        <ResultWrapperHeader
                isLoading={isLoading}
                headerTitle={headerTitle}
                location={location}
                metadata={metadata}/>
        {children}
        <ResultWrapperFooter
                isLoading={isLoading}
                location={location}
                metadata={metadata}/>
    </section>
)

...
```

#### ResultBannerAd.js

```js
import React from 'react'
import { Link } from 'react-router-dom'
import './ResultBannerAd.scss'

const ResultBannerAd = ({
    imageUrl,
    targetUrl
}) => (
    <Link styleName='ResultBannerAd' to={targetUrl}>
        <img styleName='ResultBannerAd__image' src={imageUrl}/>
    </Link>
)

export default ResultBannerAd
```

#### ResultBannerAd.scss

```css
@import 'layout/style/common.scss';

.ResultBannerAd {
    height: auto;
    width: 100%;

    .ResultBannerAd__image {
        width: 100%;
    }
}
```

## Create the Content in Broadleaf

Now that we have a basic component rendering static content, we need to create some
dynamic content in the admin.

#### Create a ReactComponentType enumeration

First we need to be sure we have an enumeration for the React Component, add an entry
to ReactComponentType:

```java
public class ReactComponentType implements Serializable, BroadleafEnumerationType {
    ...

    public static final ReactComponentType BANNER_AD_CAROUSEL = new ReactComponentType("BANNER_AD_CAROUSEL", "Banner Ad Carousel Widget");
    public static final ReactComponentType HOME_MIDDLE_PROMO = new ReactComponentType("HOME_MIDDLE_PROMO", "Home Middle Promo Widget");
    public static final ReactComponentType RIGHT_HAND_BANNER = new ReactComponentType("RIGHT_HAND_BANNER", "Right Hand Banner Widget");
    public static final ReactComponentType RIGHT_HAND_RELATED = new ReactComponentType("RIGHT_HAND_RELATED", "Right Hand Related Product Widget");

    // Our new component
    public static final ReactComponentType RESULT_BANNER_AD = new ReactComponentType("RESULT_BANNER_AD", "Result Banner Ad Widget");

    ...
}
```

#### Create a Widget

Second we need to go into the admin and create a Widget for our new component.

![widget-creation](https://cl.ly/440q1N3t2b3u/Image%202017-06-21%20at%201.26.05%20PM.png)

#### Create a ContentItem

Next we need to create a ContentItem and set up our content data.

![content-item-creation](https://cl.ly/1H2D161y310W/Image%202017-06-21%20at%201.32.44%20PM.png)

#### Create the ContentZone

Lastly, we need to create the ContentZone and specify the default item as our newly created ContentItem

![content-zone-creation](https://cl.ly/1P1I3w2G1U0D/Image%202017-06-21%20at%201.37.24%20PM.png)


## Refactor component into a Widget

Now that we have the content data set up, we need to refactor our component into
a widget and add it to get WidgetManager.

#### ResultWrapper.js

```js
import React from 'react'
import ResultWrapperHeader from 'catalog/search/components/ResultWrapperHeader'
import ResultWrapperFooter from 'catalog/search/components/ResultWrapperFooter'
import ContentZone from 'content/components/ContentZone'

export const ResultWrapper = ({
    children,
    isLoading,
    headerTitle,
    location,
    metadata,
}) => (
    <section id="result-wrapper">
        <ContentZone name='Result Banner Ad Zone'/>
        <ResultWrapperHeader
                isLoading={isLoading}
                headerTitle={headerTitle}
                location={location}
                metadata={metadata}/>
        {children}
        <ResultWrapperFooter
                isLoading={isLoading}
                location={location}
                metadata={metadata}/>
    </section>
)
```

#### WidgetManager.js

```js
...
import RightHandRelatedProductWidget from 'content/components/widgets/RightHandRelatedProductWidget'
import ResultBannerAdWidget from 'content/components/widgets/ResultBannerAdWidget'

const widgets = {
    BANNER_AD_CAROUSEL: BannerAdCarouselWidget,
    HOME_MIDDLE_PROMO: HomeMiddlePromoWidget,
    RIGHT_HAND_BANNER: RightHandBannerWidget,
    RIGHT_HAND_RELATED: RightHandRelatedProductWidget,
    RESULT_BANNER_AD: ResultBannerAdWidget,
}

...
```

#### ResultBannerAdWidget.js

```js
import React from 'react'
import { Link } from 'react-router-dom'
import './ResultBannerAdWidget.scss'

const ResultBannerAdWidget = ({
    sc
}) => (
    <Link styleName='ResultBannerAdWidget' to={sc.values.targetUrl}>
        <img styleName='ResultBannerAdWidget__image' src={sc.values.imageUrl}/>
    </Link>
)

export default ResultBannerAdWidget
```

#### ResultBannerAdWidget.scss

```css

.ResultBannerAdWidget {
    height: auto;
    width: 100%;

    .ResultBannerAdWidget__image {
        width: 100%;
    }
}
```

## Conclusion

If you followed the steps above you should have a new ContentZone component being
rendered at the top of your result pages. In future how-to's we will cover how to
use content targeting in a React application.
