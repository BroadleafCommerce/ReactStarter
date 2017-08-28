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
