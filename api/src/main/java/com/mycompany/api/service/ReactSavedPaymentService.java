/*
 * #%L
 * React API Starter
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
