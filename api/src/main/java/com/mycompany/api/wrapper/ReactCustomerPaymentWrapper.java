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
package com.mycompany.api.wrapper;

import org.broadleafcommerce.core.order.domain.Order;
import org.broadleafcommerce.core.web.order.CartState;
import org.broadleafcommerce.core.web.order.service.CartStateService;
import org.broadleafcommerce.profile.core.domain.CustomerPayment;
import org.springframework.context.ApplicationContext;
import com.broadleafcommerce.rest.api.wrapper.CustomerPaymentWrapper;
import java.util.HashMap;
import java.util.Map;
import javax.servlet.http.HttpServletRequest;
import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlRootElement;

/**
 * @author Nick Crum ncrum
 */
@XmlRootElement(name = "customerPayment")
@XmlAccessorType(value = XmlAccessType.FIELD)
public class ReactCustomerPaymentWrapper extends CustomerPaymentWrapper {

    protected boolean usedByCurrentCart = false;

    protected Map<String, String> additionalFieldMap = new HashMap<>();

    @Override
    public void wrapDetails(CustomerPayment model, HttpServletRequest request) {
        super.wrapDetails(model, request);

        this.additionalFieldMap = model.getAdditionalFields();

        Order cart = CartState.getCart();

        if (cart != null) {

            CartStateService cartStateService = (CartStateService) context.getBean("blCartStateService");
            if (cartStateService != null) {
                this.usedByCurrentCart = cartStateService.cartHasCreditCardPaymentWithSameToken(model.getPaymentToken());
            }
        }
    }

    @Override
    public CustomerPayment unwrap(HttpServletRequest request, ApplicationContext context) {
        CustomerPayment customerPayment = super.unwrap(request, context);

        customerPayment.setAdditionalFields(this.getAdditionalFieldMap());

        return customerPayment;
    }

    public boolean isUsedByCurrentCart() {
        return usedByCurrentCart;
    }

    public void setUsedByCurrentCart(boolean usedByCurrentCart) {
        this.usedByCurrentCart = usedByCurrentCart;
    }

    public Map<String, String> getAdditionalFieldMap() {
        return additionalFieldMap;
    }

    public void setAdditionalFieldMap(Map<String, String> additionalFieldMap) {
        this.additionalFieldMap = additionalFieldMap;
    }
}
