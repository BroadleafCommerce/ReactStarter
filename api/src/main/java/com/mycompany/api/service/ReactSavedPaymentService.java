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
package com.mycompany.api.service;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.broadleafcommerce.common.payment.PaymentAdditionalFieldType;
import org.broadleafcommerce.common.payment.dto.PaymentRequestDTO;
import org.broadleafcommerce.common.payment.dto.PaymentResponseDTO;
import org.broadleafcommerce.common.payment.service.CustomerPaymentGatewayService;
import org.broadleafcommerce.common.payment.service.PaymentGatewayCustomerService;
import org.broadleafcommerce.common.vendor.service.exception.PaymentException;
import org.broadleafcommerce.payment.service.gateway.SamplePaymentGatewayConfiguration;
import org.broadleafcommerce.profile.core.domain.Address;
import org.broadleafcommerce.profile.core.domain.Customer;
import org.broadleafcommerce.vendor.sample.service.payment.MessageConstants;
import org.springframework.stereotype.Service;
import javax.annotation.Resource;

/**
 * @author Nick Crum ncrum
 */
@Service
public class ReactSavedPaymentService {

    private static final Log LOG = LogFactory.getLog(ReactSavedPaymentService.class);

    @Resource(name = "blSamplePaymentGatewayCustomerService")
    protected PaymentGatewayCustomerService paymentGatewayCustomerService;

    @Resource(name = "blSamplePaymentGatewayConfiguration")
    protected SamplePaymentGatewayConfiguration configuration;

    @Resource(name = "blCustomerPaymentGatewayService")
    protected CustomerPaymentGatewayService customerPaymentGatewayService;

    public Long addSavedPayment(Customer customer, String nonce, String paymentName, Address address, boolean isDefault) {
        try {
            PaymentRequestDTO requestDTO = buildPaymentRequestDTO(customer, nonce);
            PaymentResponseDTO responseDTO = paymentGatewayCustomerService.createGatewayCustomer(requestDTO);

            if (responseDTO.isSuccessful()) {
                addAddressToResponseDTO(responseDTO, address);
                addPaymentNameToResponseDTO(responseDTO, paymentName);
                addIsDefaultMethodToResponseDTO(responseDTO, isDefault);

                return customerPaymentGatewayService.createCustomerPaymentFromResponseDTO(responseDTO, configuration);
            }
        } catch (PaymentException e) {
            LOG.error("Could not create gateway customer", e);
        }
        return null;
    }

    public Long updateSavedPayment(String customerPaymentToken, Customer customer, String nonce, String paymentName, Address address, boolean isDefault) {
        try {
            PaymentRequestDTO requestDTO = buildPaymentRequestDTO(customer, nonce);
            PaymentResponseDTO responseDTO = paymentGatewayCustomerService.updateGatewayCustomer(requestDTO);
            responseDTO.paymentToken(customerPaymentToken);

            if (responseDTO.isSuccessful()) {
                addAddressToResponseDTO(responseDTO, address);
                addPaymentNameToResponseDTO(responseDTO, paymentName);
                addIsDefaultMethodToResponseDTO(responseDTO, isDefault);

                return customerPaymentGatewayService.updateCustomerPaymentFromResponseDTO(responseDTO, configuration);
            }
        } catch (PaymentException e) {
            LOG.error("Could not create gateway customer", e);
        }
        return null;
    }

    protected PaymentRequestDTO buildPaymentRequestDTO(Customer customer, String nonce) {
        return new PaymentRequestDTO()
                .customer()
                .customerId(customer.getId().toString())
                .firstName(customer.getFirstName())
                .lastName(customer.getLastName())
                .email(customer.getEmailAddress())
                .done()
                .additionalField(MessageConstants.PAYMENT_NONCE, nonce);
    }

    protected void addAddressToResponseDTO(PaymentResponseDTO responseDTO, Address address) {
        responseDTO.billTo()
                .addressFullName(address.getFullName())
                .addressFirstName(address.getFirstName())
                .addressLastName(address.getLastName())
                .addressLine1(address.getAddressLine1())
                .addressLine2(address.getAddressLine2())
                .addressCityLocality(address.getCity())
                .addressStateRegion(address.getStateProvinceRegion())
                .addressCountryCode(address.getIsoCountryAlpha2().getAlpha2())
                .addressPostalCode(address.getPostalCode())
                .addressPhone(address.getPhonePrimary().getPhoneNumber());
    }

    private void addPaymentNameToResponseDTO(PaymentResponseDTO responseDTO, String paymentName) {
        responseDTO.getResponseMap().put(PaymentAdditionalFieldType.PAYMENT_NAME.getType(), paymentName);
    }

    private void addIsDefaultMethodToResponseDTO(PaymentResponseDTO responseDTO, boolean isDefault) {
        responseDTO.getResponseMap().put("isDefault", Boolean.toString(isDefault));
    }
}
