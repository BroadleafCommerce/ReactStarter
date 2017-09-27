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
import { Helmet } from 'react-helmet'
import AccordionDescription from './AccordionDescription'
import AddToCartForm from './AddToCartForm'
import Breadcrumbs from 'catalog/breadcrumbs/components/Breadcrumbs'
import Button from 'material-kit/components/Button'
import RightHandRelatedProductWidget from 'content/components/widgets/RightHandRelatedProductWidget'
import Price from 'material-kit/components/Price'
import ProductImagePicker from 'catalog/product/components/ProductImagePicker'
import PromotionMessages from './PromotionMessages'
import ProductOptions from './ProductOptions'
import ProductReviews from 'catalog/product/components/ProductReviews'
import SocialMediaButtons from './SocialMediaButtons'
import WishlistButton from 'catalog/product/components/WishlistButton'

const ProductView = ({
    addToCartText,
    disabled,
    handleAddToCartSubmit,
    id,
    initialFormValues,
    longDescription,
    manufacturer,
    match,
    media,
    name,
    primaryMedia,
    productOption,
    promotionMessages,
    retailPrice,
    salePrice,
    seoProperties,
}) =>  (
    <div className='container'>
        <Helmet titleTemplate='Heat Clinic - %s'>
            {seoProperties.title && (
                <title>{seoProperties.title}</title>
            )}
            {seoProperties.description && (
                <meta name="description" content={seoProperties.description} />
            )}
        </Helmet>

        <Breadcrumbs entityType='PRODUCT' entityURI={`/${match.params.category}/${match.params.product}`}/>

        <div className='product-page' style={{ background: 'none' }}>
            <div className='main-product card-product row'>
                <ProductImagePicker
                    className='col-sm-6'
                    defaultMediaId={primaryMedia.id}
                    media={media}
                />

                <div className='col-sm-6'> {/* Product Details */}
                    <h3>{name}</h3>
                    <div>{manufacturer}</div>

                    <div>
                        <h3 className='main-price'>
                            <Price retailPrice={retailPrice} salePrice={salePrice}/>
                        </h3>
                    </div>

                    <PromotionMessages promotionMessages={promotionMessages}/>

                    <AddToCartForm initialValues={initialFormValues}>
                        {({ handleSubmit }) => (
                            <div>
                                <ProductOptions productOption={productOption}/>

                                <div className='row'>
                                    <div className='col-sm-10'>
                                        <Button
                                            type='button'
                                            primary={!disabled}
                                            disabled={disabled}
                                            onClick={handleSubmit(values => {
                                                handleAddToCartSubmit({
                                                    ...values,
                                                    isWishlistAdd: false,
                                                })
                                            })}
                                        >
                                            {addToCartText}
                                        </Button>
                                    </div>
                                    <div className='col-sm-2 text-center-mobile'>
                                        <WishlistButton
                                            id={id}
                                            onAddItemClick={handleSubmit(values => {
                                                handleAddToCartSubmit({
                                                    ...values,
                                                    isWishlistAdd: true,
                                                })
                                            })}
                                        />
                                    </div>
                                </div>

                                <SocialMediaButtons/>
                            </div>
                        )}
                    </AddToCartForm>

                    <AccordionDescription longDescription={longDescription}/>

                </div>
            </div>
        </div>

        <hr/>

        <ProductReviews productId={id}/>

        <hr/>

        <RightHandRelatedProductWidget
            productKey={match.params.product}
            sc={{
                values: {
                    headerText: 'Featured Products',
                    relatedProductsMaxNum: 3,
                    relatedProductsType: 'FEATURED',
                }
            }}
        />
    </div>
)

export default ProductView
