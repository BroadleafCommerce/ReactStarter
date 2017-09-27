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
package com.mycompany.api.endpoint.customer;

import org.apache.commons.collections.CollectionUtils;
import org.apache.commons.httpclient.HttpStatus;
import org.broadleafcommerce.common.payment.PaymentAdditionalFieldType;
import org.broadleafcommerce.profile.core.domain.Customer;
import org.broadleafcommerce.profile.core.domain.CustomerAddress;
import org.broadleafcommerce.profile.core.domain.CustomerPayment;
import org.broadleafcommerce.profile.core.service.CustomerAddressService;
import org.broadleafcommerce.profile.core.service.CustomerPaymentService;
import org.broadleafcommerce.profile.core.service.CustomerService;
import org.broadleafcommerce.profile.web.core.CustomerState;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.broadleafcommerce.rest.api.endpoint.BaseEndpoint;
import com.broadleafcommerce.rest.api.exception.BroadleafWebServicesException;
import com.broadleafcommerce.rest.api.wrapper.CustomerAddressWrapper;
import com.broadleafcommerce.rest.api.wrapper.CustomerPaymentWrapper;
import com.broadleafcommerce.rest.api.wrapper.CustomerWrapper;
import com.mycompany.api.service.ReactSavedPaymentService;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import javax.servlet.http.HttpServletRequest;

/**
 * @author Nick Crum ncrum
 */
@RestController
@RequestMapping(value = "/customer",
        produces = {MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_XML_VALUE})
public class ReactCustomerEndpoint extends BaseEndpoint {

    protected final CustomerAddressService customerAddressService;
    protected final ReactSavedPaymentService savedPaymentService;
    protected final CustomerPaymentService customerPaymentService;
    protected final CustomerService customerService;

    @Autowired
    public ReactCustomerEndpoint(CustomerAddressService customerAddressService, CustomerPaymentService customerPaymentService, ReactSavedPaymentService savedPaymentService, CustomerService customerService) {
        this.customerAddressService = customerAddressService;
        this.customerPaymentService = customerPaymentService;
        this.savedPaymentService = savedPaymentService;
        this.customerService = customerService;
    }

    @RequestMapping(value = "/current")
    public CustomerWrapper getCurrentCustomer(HttpServletRequest request) {
        Customer customer = CustomerState.getCustomer();
        if (customer != null) {
            CustomerWrapper customerWrapper = (CustomerWrapper) context.getBean(CustomerWrapper.class.getName());
            customerWrapper.wrapDetails(customer, request);
            return customerWrapper;
        }

        throw BroadleafWebServicesException.build(HttpStatus.SC_BAD_REQUEST)
                .addMessage(BroadleafWebServicesException.CUSTOMER_NOT_FOUND);
    }

    @RequestMapping(value = "/remove-address/{customerAddressId}", method = RequestMethod.DELETE)
    public List<CustomerAddressWrapper> deleteAddress(HttpServletRequest request, @PathVariable("customerAddressId") Long customerAddressId) {

        Customer customer = CustomerState.getCustomer();
        if (customer == null) {
            throw BroadleafWebServicesException.build(HttpStatus.SC_NOT_FOUND)
                    .addMessage(BroadleafWebServicesException.CUSTOMER_NOT_FOUND);
        }

        CustomerAddress customerAddress = customerAddressService.readCustomerAddressById(customerAddressId);

        if (customerAddress == null || !Objects.equals(customerAddress.getCustomer().getId(), customer.getId())) {
            throw BroadleafWebServicesException.build(HttpStatus.SC_NOT_FOUND)
                    .addMessage(BroadleafWebServicesException.CUSTOMER_ADDRESS_NOT_FOUND);
        }

        customerAddressService.deleteCustomerAddressById(customerAddressId);

        List<CustomerAddress> addresses = customerAddressService.readActiveCustomerAddressesByCustomerId(customer.getId());
        List<CustomerAddressWrapper> wrappers = new ArrayList<CustomerAddressWrapper>();
        if (!CollectionUtils.isEmpty(addresses)) {
            for (CustomerAddress address : addresses) {
                CustomerAddressWrapper wrapper = (CustomerAddressWrapper) context.getBean(CustomerAddressWrapper.class.getName());
                wrapper.wrapDetails(address, request);
                wrappers.add(wrapper);
            }
        }
        return wrappers;
    }

    @RequestMapping(value = "/customer-payment", method = RequestMethod.POST)
    public List<CustomerPaymentWrapper> addCustomerPayment(HttpServletRequest request,
                                                           @RequestBody CustomerPaymentWrapper customerPaymentWrapper,
                                                           @RequestParam("payment_method_nonce") String nonce) {
        Customer customer = CustomerState.getCustomer();

        if (customer == null) {
            throw BroadleafWebServicesException.build(HttpStatus.SC_NOT_FOUND)
                    .addMessage(BroadleafWebServicesException.CUSTOMER_NOT_FOUND);
        }

        CustomerPayment customerPayment = customerPaymentWrapper.unwrap(request, context);

        Long customerPaymentId = savedPaymentService.addSavedPayment(
                customer,
                nonce,
                customerPayment.getAdditionalFields().get(PaymentAdditionalFieldType.PAYMENT_NAME.getType()),
                customerPayment.getBillingAddress(),
                customerPayment.isDefault());
        customer = customerService.saveCustomer(customer);
        if (customerPaymentId != null) {
            return getCustomerPaymentWrappers(request, customer);
        }

        throw BroadleafWebServicesException.build(HttpStatus.SC_NOT_FOUND)
                .addMessage(BroadleafWebServicesException.CUSTOMER_NOT_FOUND);
    }

    @RequestMapping(value = "/customer-payment/{customerPaymentId}", method = RequestMethod.PUT)
    public List<CustomerPaymentWrapper> updateCustomerPayment(HttpServletRequest request,
                                                              @RequestBody CustomerPaymentWrapper customerPaymentWrapper,
                                                              @PathVariable("customerPaymentId") Long customerPaymentId,
                                                              @RequestParam("payment_method_nonce") String nonce) {
        Customer customer = CustomerState.getCustomer();

        if (customer == null) {
            throw BroadleafWebServicesException.build(HttpStatus.SC_NOT_FOUND)
                    .addMessage(BroadleafWebServicesException.CUSTOMER_NOT_FOUND);
        }

        CustomerPayment newCustomerPayment = customerPaymentWrapper.unwrap(request, context);
        CustomerPayment oldCustomerPayment = customerPaymentService.readCustomerPaymentById(customerPaymentId);

        savedPaymentService.updateSavedPayment(
                oldCustomerPayment.getPaymentToken(),
                customer,
                nonce,
                newCustomerPayment.getAdditionalFields().get(PaymentAdditionalFieldType.PAYMENT_NAME.getType()),
                newCustomerPayment.getBillingAddress(),
                newCustomerPayment.isDefault());
        customer = customerService.saveCustomer(customer);

        return getCustomerPaymentWrappers(request, customer);
    }

    @RequestMapping(value = "/customer-payment/{customerPaymentId}/default", method = RequestMethod.POST)
    public List<CustomerPaymentWrapper> makePaymentDefault(HttpServletRequest request,
                                                           @PathVariable("customerPaymentId") Long customerPaymentId) {
        Customer customer = CustomerState.getCustomer();

        if (customer == null) {
            throw BroadleafWebServicesException.build(HttpStatus.SC_NOT_FOUND)
                    .addMessage(BroadleafWebServicesException.CUSTOMER_NOT_FOUND);
        }

        CustomerPayment customerPayment = customerPaymentService.readCustomerPaymentById(customerPaymentId);

        if (customerPayment == null) {
            throw new IllegalArgumentException("Requested customer payment does not exist.");
        }

        customerPaymentService.setAsDefaultPayment(customerPayment);

        return getCustomerPaymentWrappers(request, customer);
    }

    protected List<CustomerPaymentWrapper> getCustomerPaymentWrappers(HttpServletRequest request, Customer customer) {
        List<CustomerPaymentWrapper> payments = new ArrayList<>();
        for (CustomerPayment payment : customer.getCustomerPayments()) {
            CustomerPaymentWrapper response = (CustomerPaymentWrapper) context.getBean(CustomerPaymentWrapper.class.getName());
            response.wrapDetails(payment, request);
            payments.add(response);
        }

        return payments;
    }
}
