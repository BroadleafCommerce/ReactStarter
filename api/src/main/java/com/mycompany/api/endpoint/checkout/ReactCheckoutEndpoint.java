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

package com.mycompany.api.endpoint.checkout;


import org.apache.commons.httpclient.HttpStatus;
import org.broadleafcommerce.common.payment.PaymentGatewayType;
import org.broadleafcommerce.common.payment.PaymentTransactionType;
import org.broadleafcommerce.common.payment.PaymentType;
import org.broadleafcommerce.common.payment.service.PaymentGatewayCheckoutService;
import org.broadleafcommerce.core.checkout.service.gateway.PassthroughPaymentConstants;
import org.broadleafcommerce.core.order.domain.Order;
import org.broadleafcommerce.core.payment.domain.OrderPayment;
import org.broadleafcommerce.core.payment.domain.PaymentTransaction;
import org.broadleafcommerce.core.pricing.service.exception.PricingException;
import org.broadleafcommerce.core.web.order.CartState;
import org.broadleafcommerce.core.web.order.service.CartStateService;
import org.broadleafcommerce.profile.core.domain.Address;
import org.broadleafcommerce.profile.core.domain.Customer;
import org.broadleafcommerce.profile.core.domain.CustomerPayment;
import org.broadleafcommerce.profile.core.service.AddressService;
import org.broadleafcommerce.profile.web.core.CustomerState;
import org.broadleafcommerce.vendor.sample.service.payment.SamplePaymentGatewayConstants;
import org.broadleafcommerce.vendor.sample.service.payment.SamplePaymentGatewayType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.broadleafcommerce.rest.api.exception.BroadleafWebServicesException;
import com.broadleafcommerce.rest.api.wrapper.AddressWrapper;
import com.broadleafcommerce.rest.api.wrapper.OrderPaymentWrapper;
import com.broadleafcommerce.rest.api.wrapper.OrderWrapper;
import com.broadleafcommerce.rest.api.wrapper.PaymentTransactionWrapper;
import com.mycompany.api.service.ReactSavedPaymentService;
import java.util.ArrayList;
import java.util.List;
import javax.servlet.http.HttpServletRequest;

/**
 * This is a reference REST API endpoint for checkout. This can be modified, used as is, or removed. 
 * The purpose is to provide an out of the box RESTful checkout service implementation, but also 
 * to allow the implementor to have fine control over the actual API, URIs, and general JAX-RS annotations.
 * 
 * @author Kelly Tisdell
 *
 */
@RestController
@RequestMapping(value = "/cart/checkout",
    produces = {MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_XML_VALUE})
public class ReactCheckoutEndpoint extends com.broadleafcommerce.rest.api.endpoint.checkout.CheckoutEndpoint {

    @Autowired
    protected AddressService addressService;

    @Autowired
    protected ReactSavedPaymentService savedPaymentService;

    @Autowired
    protected CartStateService cartStateService;

    @Autowired(required=false)
    @Qualifier("blPaymentGatewayCheckoutService")
    protected PaymentGatewayCheckoutService paymentGatewayCheckoutService;

    @Override
    @RequestMapping(value = "/payments", method = RequestMethod.GET)
    public List<OrderPaymentWrapper> findPaymentsForOrder(HttpServletRequest request,
                                                          @RequestParam("cartId") Long cartId) {
        return super.findPaymentsForOrder(request, cartId);
    }

    @Override
    @RequestMapping(value = "/payment", method = RequestMethod.POST,
        consumes = { MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_XML_VALUE })
    public OrderPaymentWrapper addPaymentToOrder(HttpServletRequest request,
                                                 @RequestBody OrderPaymentWrapper wrapper,
                                                 @RequestParam("cartId") Long cartId) {
        return super.addPaymentToOrder(request, wrapper, cartId);
    }
    
    @Override
    @RequestMapping(value = "/payment/{customerPaymentId}", method = RequestMethod.POST)
    public OrderPaymentWrapper addPaymentToOrderById(HttpServletRequest request,
                                                     @RequestParam("amount") Double amount,
                                                     @RequestParam("currency") String currencyCode,
                                                     @PathVariable("customerPaymentId") Long customerPaymentId,
                                                     @RequestParam("cartId") Long cartId) {
        return super.addPaymentToOrderById(request, amount, currencyCode, customerPaymentId, cartId);
    }
    
    @Override
    @RequestMapping(value = "/payment/{paymentId}/transaction", method = RequestMethod.PUT)
    public OrderPaymentWrapper addOrderPaymentTransaction(HttpServletRequest request, 
                                                          @PathVariable("paymentId") Long orderPaymentId,
                                                          @RequestBody PaymentTransactionWrapper wrapper,
                                                          @RequestParam("cartId") Long cartId) {
        return super.addOrderPaymentTransaction(request, orderPaymentId, wrapper, cartId);
    }
    
    @Override
    @RequestMapping(value = "/payment/{paymentId}", method = RequestMethod.DELETE)
    public OrderWrapper removePaymentFromOrderById(HttpServletRequest request,
                                               @PathVariable("paymentId") Long paymentId,
                                               @RequestParam("cartId") Long cartId) {
        return super.removePaymentFromOrderById(request, paymentId, cartId);
    }

    @RequestMapping(value = "/billing-address", method = RequestMethod.POST)
    public OrderWrapper saveBillingAddressForNewPayment(HttpServletRequest request,
                                           @RequestBody AddressWrapper wrapper) throws PricingException {
        Order cart = CartState.getCart();
        Customer customer = CustomerState.getCustomer();

        if (customer == null) {
            throw BroadleafWebServicesException.build(HttpStatus.SC_NOT_FOUND)
                    .addMessage(BroadleafWebServicesException.CUSTOMER_NOT_FOUND);
        }

        if (cart != null) {
            Address address = wrapper.unwrap(request, context);

            // remove existing payments, since we are now choosing a new payment
            orderService.removePaymentsFromOrder(cart, PaymentType.CREDIT_CARD);

            // A Temporary Order Payment will be created to hold the billing address.
            // The Payment Gateway will send back any validated address and
            // the PaymentGatewayCheckoutService will persist a new payment of type CREDIT_CARD when it applies it to the Order
            OrderPayment tempOrderPayment = orderPaymentService.create();
            tempOrderPayment.setType(PaymentType.CREDIT_CARD);
            tempOrderPayment.setPaymentGatewayType(PaymentGatewayType.TEMPORARY);
            tempOrderPayment.setBillingAddress(address);
            tempOrderPayment.setOrder(cart);
            cart.getPayments().add(tempOrderPayment);

            orderService.save(cart, false);

            OrderWrapper orderWrapper = (OrderWrapper) context.getBean(OrderWrapper.class.getName());
            orderWrapper.wrapDetails(cart, request);
            return orderWrapper;
        }

        throw BroadleafWebServicesException.build(HttpStatus.SC_NOT_FOUND)
                .addMessage(BroadleafWebServicesException.CART_NOT_FOUND);
    }

    @RequestMapping(value = "/customer-payment", method = RequestMethod.POST)
    public OrderWrapper saveNewCustomerPayment(HttpServletRequest request,
                                               @RequestBody AddressWrapper wrapper,
                                               @RequestParam("payment_method_nonce") String nonce) throws PricingException {
        Order cart = CartState.getCart();
        Customer customer = CustomerState.getCustomer();

        if (customer == null) {
            throw BroadleafWebServicesException.build(HttpStatus.SC_NOT_FOUND)
                    .addMessage(BroadleafWebServicesException.CUSTOMER_NOT_FOUND);
        }

        if (cart != null) {
            Address address = wrapper.unwrap(request, context);

            Long customerPaymentId = savedPaymentService.addSavedPayment(customer, nonce, null, address, false);
            if (customerPaymentId != null) {
                CustomerPayment customerPayment = customerPaymentService.readCustomerPaymentById(customerPaymentId);
                addCustomerPaymentToOrder(cart, customerPayment);
            }

            OrderWrapper orderWrapper = (OrderWrapper) context.getBean(OrderWrapper.class.getName());
            orderWrapper.wrapDetails(cart, request);
            return orderWrapper;
        }

        throw BroadleafWebServicesException.build(HttpStatus.SC_NOT_FOUND)
                .addMessage(BroadleafWebServicesException.CART_NOT_FOUND);
    }

    @RequestMapping(value = "/customer-payment/{customerPaymentId}", method = RequestMethod.PUT)
    public OrderWrapper selectExistingCustomerPayment(HttpServletRequest request,
                                               @PathVariable("customerPaymentId") Long customerPaymentId) throws PricingException {
        Order cart = CartState.getCart();
        Customer customer = CustomerState.getCustomer();

        if (customer == null) {
            throw BroadleafWebServicesException.build(HttpStatus.SC_NOT_FOUND)
                    .addMessage(BroadleafWebServicesException.CUSTOMER_NOT_FOUND);
        }

        if (cart != null) {
            CustomerPayment customerPayment = customerPaymentService.readCustomerPaymentById(customerPaymentId);
            if (customerPayment == null) {
                throw BroadleafWebServicesException.build(HttpStatus.SC_NOT_FOUND)
                        .addMessage(BroadleafWebServicesException.CUSTOMER_PAYMENT_NOT_FOUND);
            }

            cartStateService.cartHasCreditCardPaymentWithSameToken(customerPayment.getPaymentToken());

            addCustomerPaymentToOrder(cart, customerPayment);

            OrderWrapper orderWrapper = (OrderWrapper) context.getBean(OrderWrapper.class.getName());
            orderWrapper.wrapDetails(cart, request);
            return orderWrapper;
        }

        throw BroadleafWebServicesException.build(HttpStatus.SC_NOT_FOUND)
                .addMessage(BroadleafWebServicesException.CART_NOT_FOUND);
    }

    protected void addCustomerPaymentToOrder(Order cart, CustomerPayment customerPayment) throws PricingException {
        orderService.removePaymentsFromOrder(cart, PaymentType.CREDIT_CARD);
        OrderPayment orderPayment = orderPaymentService.createOrderPaymentFromCustomerPayment(cart, customerPayment, cart.getTotalAfterAppliedPayments());
        cart.getPayments().add(orderPayment);
        orderService.save(cart, false);
    }

    @Override
    public OrderWrapper performCheckout(HttpServletRequest request,
            @RequestParam("cartId") Long cartId) {
        return null; // do nothing
    }

    @RequestMapping(method = RequestMethod.POST, value = "/complete")
    public String performCheckout(HttpServletRequest request,
                                        @RequestParam(value = "payment_method_nonce", required = false) String nonce) {
        Order cart = CartState.getCart();

        if (cart != null) {
            try {
                if (nonce != null) {
                    //Create a new PAYMENT_NONCE Order Payment
                    OrderPayment paymentNonce = orderPaymentService.create();
                    paymentNonce.setType(PaymentType.CREDIT_CARD);
                    paymentNonce.setPaymentGatewayType(SamplePaymentGatewayType.NULL_GATEWAY);
                    paymentNonce.setAmount(cart.getTotalAfterAppliedPayments());
                    paymentNonce.setOrder(cart);

                    //Populate Billing Address per UI requirements
                    //For this example, we'll copy the address from the temporary Credit Card's Billing address and archive the payment,
                    // (since Heat Clinic's checkout template saves and validates the address in a previous section).
                    OrderPayment tempPayment = null;
                    for (OrderPayment payment : cart.getPayments()) {
                        if (PaymentGatewayType.TEMPORARY.equals(payment.getGatewayType()) &&
                                PaymentType.CREDIT_CARD.equals(payment.getType())) {
                            tempPayment = payment;
                            break;
                        }
                    }
                    if (tempPayment != null){
                        paymentNonce.setBillingAddress(addressService.copyAddress(tempPayment.getBillingAddress()));
                        orderService.removePaymentFromOrder(cart, tempPayment);
                    }

                    // Create the UNCONFIRMED transaction for the payment
                    //TODO: refactor this to work without a nonce and with a customer payment
                    PaymentTransaction transaction = orderPaymentService.createTransaction();
                    transaction.setAmount(cart.getTotalAfterAppliedPayments());
                    transaction.setRawResponse("Sample Payment Nonce");
                    transaction.setSuccess(true);
                    transaction.setType(PaymentTransactionType.UNCONFIRMED);
                    transaction.getAdditionalFields().put(SamplePaymentGatewayConstants.PAYMENT_METHOD_NONCE, nonce);

                    transaction.setOrderPayment(paymentNonce);
                    paymentNonce.addTransaction(transaction);
                    orderService.addPaymentToOrder(cart, paymentNonce, null);

                    cart = orderService.save(cart, true);
                }

                return paymentGatewayCheckoutService.initiateCheckout(cart.getId());
            } catch (Exception e) {
                throw BroadleafWebServicesException.build(HttpStatus.SC_INTERNAL_SERVER_ERROR)
                        .addMessage(BroadleafWebServicesException.CHECKOUT_PROCESSING_ERROR);
            }
        }

        throw BroadleafWebServicesException.build(HttpStatus.SC_NOT_FOUND)
                .addMessage(BroadleafWebServicesException.CART_NOT_FOUND);
    }

    @RequestMapping(method = RequestMethod.POST, value = "/cod/complete")
    public String performCodCheckout(HttpServletRequest request) throws Exception {
        Order cart = CartState.getCart();

        if (cart != null) {
            //Invalidate any payments already on the order that do not have transactions on them that are UNCONFIRMED
            List<OrderPayment> paymentsToInvalidate = new ArrayList<OrderPayment>();
            for (OrderPayment payment : cart.getPayments()) {
                if (payment.isActive()) {
                    if (payment.getTransactions() == null || payment.getTransactions().isEmpty()) {
                        paymentsToInvalidate.add(payment);
                    } else {
                        for (PaymentTransaction transaction : payment.getTransactions()) {
                            if (!PaymentTransactionType.UNCONFIRMED.equals(transaction.getType())) {
                                paymentsToInvalidate.add(payment);
                            }
                        }
                    }
                }
            }

            for (OrderPayment payment : paymentsToInvalidate) {
                cart.getPayments().remove(payment);
                if (paymentGatewayCheckoutService != null) {
                    paymentGatewayCheckoutService.markPaymentAsInvalid(payment.getId());
                }
            }

            //Create a new Order Payment of the passed in type
            OrderPayment passthroughPayment = orderPaymentService.create();
            passthroughPayment.setType(PaymentType.COD);
            passthroughPayment.setPaymentGatewayType(PaymentGatewayType.PASSTHROUGH);
            passthroughPayment.setAmount(cart.getTotalAfterAppliedPayments());
            passthroughPayment.setOrder(cart);

            // Create the transaction for the payment
            PaymentTransaction transaction = orderPaymentService.createTransaction();
            transaction.setAmount(cart.getTotalAfterAppliedPayments());
            transaction.setRawResponse("Passthrough Payment");
            transaction.setSuccess(true);
            transaction.setType(PaymentTransactionType.AUTHORIZE_AND_CAPTURE);
            transaction.getAdditionalFields().put(PassthroughPaymentConstants.PASSTHROUGH_PAYMENT_TYPE, PaymentType.COD.getType());

            transaction.setOrderPayment(passthroughPayment);
            passthroughPayment.addTransaction(transaction);
            orderService.addPaymentToOrder(cart, passthroughPayment, null);

            orderService.save(cart, true);
            return paymentGatewayCheckoutService.initiateCheckout(cart.getId());
        }

        throw BroadleafWebServicesException.build(HttpStatus.SC_NOT_FOUND)
                .addMessage(BroadleafWebServicesException.CART_NOT_FOUND);
    }
}
