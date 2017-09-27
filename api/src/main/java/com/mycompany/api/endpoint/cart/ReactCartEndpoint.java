/*
 * #%L
 * React API Starter
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
/*
 * Copyright 2008-2012 the original author or authors.
 *
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
 */

package com.mycompany.api.endpoint.cart;

import org.apache.commons.httpclient.HttpStatus;
import org.apache.commons.lang.StringUtils;
import org.broadleafcommerce.authapi.service.AuthenticationTokenService;
import org.broadleafcommerce.core.order.domain.Order;
import org.broadleafcommerce.core.order.domain.OrderItem;
import org.broadleafcommerce.core.order.service.call.OrderItemRequestDTO;
import org.broadleafcommerce.core.order.service.exception.AddToCartException;
import org.broadleafcommerce.core.order.service.exception.RemoveFromCartException;
import org.broadleafcommerce.core.pricing.service.exception.PricingException;
import org.broadleafcommerce.core.web.order.CartState;
import org.broadleafcommerce.core.web.service.UpdateCartService;
import org.broadleafcommerce.profile.core.domain.Customer;
import org.broadleafcommerce.profile.web.core.CustomerState;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.core.env.Environment;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import com.broadleafcommerce.rest.api.exception.BroadleafWebServicesException;
import com.broadleafcommerce.rest.api.wrapper.ConfigurableOrderItemWrapper;
import com.broadleafcommerce.rest.api.wrapper.ErrorMessageWrapper;
import com.broadleafcommerce.rest.api.wrapper.ErrorWrapper;
import com.broadleafcommerce.rest.api.wrapper.OrderAttributeWrapper;
import com.broadleafcommerce.rest.api.wrapper.OrderItemAttributeWrapper;
import com.broadleafcommerce.rest.api.wrapper.OrderItemWrapper;
import com.broadleafcommerce.rest.api.wrapper.OrderWrapper;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.mchange.v1.lang.BooleanUtils;
import com.mycompany.api.exception.ConfigurableItemException;
import java.io.IOException;
import java.util.List;
import java.util.Map;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * This is a reference REST API endpoint for cart. This can be modified, used as is, or removed. 
 * The purpose is to provide an out of the box RESTful cart service implementation, but also 
 * to allow the implementor to have fine control over the actual API, URIs, and general JAX-RS annotations.
 * 
 * @author Kelly Tisdell
 *
 */
@RestController
@RequestMapping(value = "/cart", produces = { MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_XML_VALUE })
public class ReactCartEndpoint extends com.broadleafcommerce.rest.api.endpoint.order.CartEndpoint {

    protected final Environment environment;
    protected final AuthenticationTokenService authenticationTokenService;
    protected final UpdateCartService updateCartService;

    @Autowired
    public ReactCartEndpoint(Environment environment, AuthenticationTokenService authenticationTokenService, @Qualifier("blUpdateCartService") UpdateCartService updateCartService) {
        this.environment = environment;
        this.authenticationTokenService = authenticationTokenService;
        this.updateCartService = updateCartService;
    }

    @RequestMapping(value = "", method = RequestMethod.GET)
    public OrderWrapper findCartForCustomer(HttpServletRequest request, HttpServletResponse response, @RequestParam(value = "onlyIfExists", required = false, defaultValue = "false") Boolean onlyIfExists) {
        try {
            Customer customer = CustomerState.getCustomer();
            Order cart = CartState.getCart();
            if (customer == null) {
                throw BroadleafWebServicesException.build(HttpStatus.SC_NOT_FOUND)
                        .addMessage(BroadleafWebServicesException.CUSTOMER_NOT_FOUND);
            }

            if (cart == null) {
                cart = orderService.findCartForCustomer(customer);
            }

            if (cart == null) {
                return createNewCartForCustomer(request);
            }

            OrderWrapper wrapper = (OrderWrapper) context.getBean(OrderWrapper.class.getName());
            wrapper.wrapDetails(cart, request);

            return wrapper;
        } catch (Exception e) {
            if (!onlyIfExists) {
                // if we failed to find the cart, create a new one
                return createNewCartForCustomer(request, response);
            }

            return null;
        }
    }

    @RequestMapping(value = "", method = RequestMethod.POST)
    public OrderWrapper createNewCartForCustomer(HttpServletRequest request, HttpServletResponse response) {
        OrderWrapper resultWrapper = super.createNewCartForCustomer(request);

        // if this is not a registered customer, send an anonymous customer token that the user can use for future requests as an anonymous customer
        if (!resultWrapper.getCustomer().isRegistered()) {
            String customerToken = authenticationTokenService.generateCustomerToken(resultWrapper.getCustomer().getId());
            response.addHeader(getCustomerTokenHeader(), customerToken);
        }
        return resultWrapper;
    }

    protected String getCustomerTokenHeader() {
        return environment.getProperty("blc.auth.jwt.customer.header");
    }

    @Override
    @RequestMapping(value = "/{cartId}", method = RequestMethod.GET)
    public OrderWrapper findCartById(HttpServletRequest request,
                                     @PathVariable("cartId") Long cartId) {
        return super.findCartById(request, cartId);
    }

    @RequestMapping(value = "/{cartId}/item", method = RequestMethod.POST)
    public OrderWrapper addItemToOrder(HttpServletRequest request,
                                       @PathVariable("cartId") Long cartId,
                                       @RequestParam(value = "priceOrder", required = false, defaultValue = "true") Boolean priceOrder,
                                       @RequestBody OrderItemWrapper orderItemWrapper) throws RemoveFromCartException {
        Order cart = orderRequestService.validateCartAndCustomer(cartId);

        try {

            if (orderItemWrapper.getProductId() == null && orderItemWrapper.getSkuId() == null && StringUtils.isBlank(orderItemWrapper.getName())) {
                throw BroadleafWebServicesException.build(HttpStatus.SC_BAD_REQUEST)
                        .addMessage(BroadleafWebServicesException.INVALID_ADD_TO_CART_REQUEST);
            }

            OrderItemRequestDTO orderItemRequestDTO = orderRequestService.populateOrderItemRequestDTO(request, orderItemWrapper);

            if (priceOrder == null) {
                priceOrder = true;
            }

            // Validate the add to cart
            updateCartService.validateAddToCartRequest(orderItemRequestDTO, cart);

            // if this is an update to an existing order item, remove the old before proceeding
            if (request.getParameter("isUpdateRequest") != null && BooleanUtils.parseBoolean(request.getParameter("isUpdateRequest"))) {
                Long originalOrderItemId = orderItemWrapper.getId();
                updateAddRequestQuantities(orderItemRequestDTO, originalOrderItemId);

                cart = orderService.removeItem(cart.getId(), originalOrderItemId, false);
                cart = orderService.save(cart, true);
            }

            Order order = orderService.addItemWithPriceOverrides(cart.getId(), orderItemRequestDTO, false);
            order = orderService.save(order, priceOrder);

            OrderWrapper wrapper = (OrderWrapper) context.getBean(OrderWrapper.class.getName());
            wrapper.wrapDetails(order, request);

            return wrapper;
        } catch (PricingException e) {
            throw BroadleafWebServicesException.build(HttpStatus.SC_INTERNAL_SERVER_ERROR, null, null, e);
        } catch (AddToCartException e) {
            throw BroadleafWebServicesException.build(HttpStatus.SC_INTERNAL_SERVER_ERROR, null, null, e);
        }

    }

    @RequestMapping(value = "/{cartId}/configure-item", method = RequestMethod.POST)
    public OrderWrapper addConfigureItemToOrder(HttpServletRequest request,
                                       @PathVariable("cartId") Long cartId,
                                       @RequestParam(value = "priceOrder", required = false, defaultValue = "true") Boolean priceOrder,
                                       @RequestParam(value = "isUpdateRequest", required = false, defaultValue = "false") Boolean isUpdateRequest,
                                       @RequestBody ConfigurableOrderItemWrapper orderItemWrapper) throws BroadleafWebServicesException, RemoveFromCartException {
        Order cart = orderRequestService.validateCartAndCustomer(cartId);

        try {

            if (orderItemWrapper.getProductId() == null && orderItemWrapper.getSkuId() == null) {
                throw BroadleafWebServicesException.build(HttpStatus.SC_BAD_REQUEST)
                        .addMessage(BroadleafWebServicesException.INVALID_ADD_TO_CART_REQUEST);
            }

            OrderItemRequestDTO orderItemRequestDTO = orderRequestService.populateOrderItemRequestDTO(request, orderItemWrapper);

            if (isUpdateRequest || orderItemWrapper.getUpdateRequest()) {
                updateCartService.validateAddToCartRequest(orderItemRequestDTO, cart);

                if (orderItemWrapper.getOriginalOrderItemId() != null) {
                    updateAddRequestQuantities(orderItemRequestDTO, orderItemWrapper.getOriginalOrderItemId());
                    cart = orderService.removeItem(cart.getId(), orderItemWrapper.getOriginalOrderItemId(), false);
                    cart = orderService.save(cart, true);
                }
            }

            if (priceOrder == null) {
                priceOrder = true;
            }

            Order order = orderService.addItemWithPriceOverrides(cart.getId(), orderItemRequestDTO, false);
            order = orderService.save(order, priceOrder);

            OrderWrapper wrapper = (OrderWrapper) context.getBean(OrderWrapper.class.getName());
            wrapper.wrapDetails(order, request);

            return wrapper;
        } catch (PricingException e) {
            throw BroadleafWebServicesException.build(HttpStatus.SC_INTERNAL_SERVER_ERROR, null, null, e);
        } catch (AddToCartException e) {
            throw BroadleafWebServicesException.build(HttpStatus.SC_INTERNAL_SERVER_ERROR, null, null, e);
        } catch (IllegalArgumentException e) {
            //TODO: this is a very hacky way to handle this, but right now there ProductAddOnService does not throw a
            // custom exception AND BroadleafWebServicesException does not support key-value pair messages
            try {
                @SuppressWarnings("unchecked")
                Map<String, String> messages = ((List<Map<String, String>>) new ObjectMapper().readValue(e.getMessage(), new TypeReference<List<Map<String,String>>>() {})).get(0);
                ConfigurableItemException ex = new ConfigurableItemException();
                for (Map.Entry<String, String> entry : messages.entrySet()) {
                    ex.addMessage(entry.getKey(), entry.getValue());
                }
                throw ex;
            } catch (IOException e1) {
                throw BroadleafWebServicesException.build(HttpStatus.SC_INTERNAL_SERVER_ERROR, null, null, e);
            }
        }
    }

    @ExceptionHandler({ ConfigurableItemException.class })
    @ResponseStatus(value = org.springframework.http.HttpStatus.BAD_REQUEST)
    public ErrorWrapper handleException(ConfigurableItemException ex) {
        ErrorWrapper errorWrapper = (ErrorWrapper) context.getBean(ErrorWrapper.class.getName());

        if (ex.getMessages() != null) {
            for (Map.Entry<String, Object> entry : ex.getMessages().entrySet()) {
                ErrorMessageWrapper errorMessageWrapper = (ErrorMessageWrapper) context.getBean(ErrorMessageWrapper.class.getName());
                errorMessageWrapper.setMessageKey(entry.getKey());
                errorMessageWrapper.setMessage(String.valueOf(entry.getValue()));
                errorWrapper.getMessages().add(errorMessageWrapper);
            }
        }

        errorWrapper.setHttpStatusCode(org.springframework.http.HttpStatus.BAD_REQUEST.value());

        return errorWrapper;
    }

    @Override
    @RequestMapping(value = "/{cartId}/items/{itemId}", method = RequestMethod.DELETE)
    public OrderWrapper removeItemFromOrder(HttpServletRequest request,
                                            @PathVariable("itemId") Long itemId,
                                            @PathVariable("cartId") Long cartId,
                                            @RequestParam(value = "priceOrder", required = false, defaultValue = "true") Boolean priceOrder) {
        return super.removeItemFromOrder(request, itemId, cartId, priceOrder);
    }

    @Override
    @RequestMapping(value = "/{cartId}/items/{itemId}", method = RequestMethod.PUT)
    public OrderWrapper updateItemQuantity(HttpServletRequest request,
                                           @PathVariable("itemId") Long itemId,
                                           @PathVariable("cartId") Long cartId,
                                           @RequestParam("quantity") Integer quantity,
                                           @RequestParam(value = "priceOrder", required = false, defaultValue = "true") Boolean priceOrder) {
        return super.updateItemQuantity(request, itemId, cartId, quantity, priceOrder);
    }

    @Override
    @RequestMapping(value = "/{cartId}/offer/{promoCode}", method = RequestMethod.POST)
    public OrderWrapper addOfferCode(HttpServletRequest request,
                                     @PathVariable("promoCode") String promoCode,
                                     @PathVariable("cartId") Long cartId,
                                     @RequestParam(value = "priceOrder", required = false, defaultValue = "true") Boolean priceOrder) {
        return super.addOfferCode(request, promoCode, cartId, priceOrder);
    }

    @Override
    @RequestMapping(value = "/{cartId}/offer/{promoCode}", method = RequestMethod.DELETE)
    public OrderWrapper removeOfferCode(HttpServletRequest request,
                                        @PathVariable("promoCode") String promoCode,
                                        @PathVariable("cartId") Long cartId,
                                        @RequestParam(value = "priceOrder", required = false, defaultValue = "true") Boolean priceOrder) {
        return super.removeOfferCode(request, promoCode, cartId, priceOrder);
    }

    @Override
    @RequestMapping(value = "/{cartId}/offers", method = RequestMethod.DELETE)
    public OrderWrapper removeAllOfferCodes(HttpServletRequest request,
                                            @PathVariable("cartId") Long cartId,
                                            @RequestParam(value = "priceOrder", required = false, defaultValue = "true") boolean priceOrder) {
        return super.removeAllOfferCodes(request, cartId, priceOrder);
    }

    @Override
    @RequestMapping(value = "/{cartId}/attributes", method = RequestMethod.PUT,
        consumes = { MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_XML_VALUE })
    public OrderWrapper updateOrderAttributes(HttpServletRequest request,
                                              @RequestBody List<OrderAttributeWrapper> attributes,
                                              @PathVariable("cartId") Long cartId,
                                              @RequestParam(value = "priceOrder", required = false, defaultValue = "true") Boolean priceOrder) {
        return super.updateOrderAttributes(request, attributes, cartId, priceOrder);
    }

    @Override
    @RequestMapping(value = "/{cartId}/attributes", method = RequestMethod.DELETE,
        consumes = { MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_XML_VALUE })
    public OrderWrapper deleteOrderAttributes(HttpServletRequest request,
                                              @RequestBody List<OrderAttributeWrapper> requestParams,
                                              @PathVariable("cartId") Long cartId,
                                              @RequestParam(value = "priceOrder", required = false, defaultValue = "true") Boolean priceOrder) {
        return super.deleteOrderAttributes(request, requestParams, cartId, priceOrder);
    }

    @Override
    @RequestMapping(value = "/{cartId}/item/{itemId}/attributes", method = RequestMethod.PUT,
        consumes = { MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_XML_VALUE })
    public OrderWrapper updateProductOptions(HttpServletRequest request,
                                             @RequestBody List<OrderItemAttributeWrapper> requestParams,
                                             @PathVariable("cartId") Long cartId,
                                             @PathVariable("itemId") Long itemId,
                                             @RequestParam(value = "priceOrder", required = false, defaultValue = "true") Boolean priceOrder) {
        return super.updateProductOptions(request, requestParams, cartId, itemId, priceOrder);
    }

    @Override
    @RequestMapping(value = "/{cartId}/item/{itemId}/attributes", method = RequestMethod.DELETE,
        consumes = { MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_XML_VALUE })
    public OrderWrapper deleteProductOptions(HttpServletRequest request,
                                             @RequestBody(required = false) List<OrderItemAttributeWrapper> requestParams,
                                             @PathVariable("cartId") Long cartId,
                                             @PathVariable("itemId") Long itemId,
                                             @RequestParam(value = "priceOrder", required = false, defaultValue = "true") Boolean priceOrder) {
        return super.deleteProductOptions(request, requestParams, cartId, itemId, priceOrder);
    }

    @Override
    @RequestMapping(value = "/configure/{productId}", method = RequestMethod.GET)
    public ConfigurableOrderItemWrapper configureItem(HttpServletRequest request, @PathVariable Long productId) {
        return super.configureItem(request, productId);
    }

    @Override
    @RequestMapping(value = "/reconfigure/{orderItemId}", method = RequestMethod.GET)
    public ConfigurableOrderItemWrapper reconfigureItemFromOrder(HttpServletRequest request, @PathVariable Long orderItemId) {
        return super.reconfigureItemFromOrder(request, orderItemId);
    }

    protected void updateAddRequestQuantities(OrderItemRequestDTO itemRequest, Long originalOrderItemId) {
        // Update the request to match the quantity of the order item it's replacing
        OrderItem orderItem = orderItemService.readOrderItemById(originalOrderItemId);

        // Make sure there is actually an order item to process
        if (orderItem == null) {
            return;
        }

        itemRequest.setQuantity(orderItem.getQuantity());
        for (OrderItemRequestDTO childDTO : itemRequest.getChildOrderItems()) {
            childDTO.setQuantity(childDTO.getQuantity() * orderItem.getQuantity());
        }
    }

    @RequestMapping(value = "/{cartId}/email", method = RequestMethod.POST)
    public OrderWrapper saveEmailForCart(HttpServletRequest request,
                                         @PathVariable("cartId") Long cartId,
                                         @RequestParam("emailAddress") String emailAddress) {
        Order cart = orderRequestService.validateCartAndCustomer(cartId);

        cart.setEmailAddress(emailAddress);

        try {
            cart = orderService.save(cart, false);
            OrderWrapper wrapper = (OrderWrapper) context.getBean(OrderWrapper.class.getName());
            wrapper.wrapDetails(cart, request);

            return wrapper;
        } catch (PricingException e) {
            throw BroadleafWebServicesException.build(HttpStatus.SC_INTERNAL_SERVER_ERROR, null, null, e);
        }
    }

}
