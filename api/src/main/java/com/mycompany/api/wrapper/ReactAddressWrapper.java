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

import org.apache.commons.collections4.ListUtils;
import org.broadleafcommerce.profile.core.domain.Address;
import org.broadleafcommerce.profile.core.domain.Customer;
import org.broadleafcommerce.profile.core.domain.CustomerAddress;
import org.broadleafcommerce.profile.web.core.CustomerState;
import com.broadleafcommerce.rest.api.wrapper.AddressWrapper;
import java.util.Objects;
import javax.servlet.http.HttpServletRequest;
import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;

/**
 * @author Nick Crum ncrum
 */
@XmlRootElement(name = "address")
@XmlAccessorType(value = XmlAccessType.FIELD)
public class ReactAddressWrapper extends AddressWrapper {

    @XmlElement
    protected Long customerAddressId;

    @XmlElement
    protected String customerAddressName;

    @Override
    public void wrapDetails(Address model, HttpServletRequest request) {
        super.wrapDetails(model, request);

        Customer customer = CustomerState.getCustomer();
        if (customer != null) {
            for (CustomerAddress customerAddress: ListUtils.emptyIfNull(customer.getCustomerAddresses())) {
                if (addressesContentsAreEqual(model, customerAddress.getAddress())) {
                    this.customerAddressId = customerAddress.getId();
                    this.customerAddressName = customerAddress.getAddressName();
                    break;
                }
            }
        }
    }

    public Long getCustomerAddressId() {
        return customerAddressId;
    }

    public void setCustomerAddressId(Long customerAddressId) {
        this.customerAddressId = customerAddressId;
    }

    public String getCustomerAddressName() {
        return customerAddressName;
    }

    public void setCustomerAddressName(String customerAddressName) {
        this.customerAddressName = customerAddressName;
    }

    protected boolean addressesContentsAreEqual(Address address1, Address address2) {
        return Objects.equals(address2.getAddressLine1(), address1.getAddressLine1()) &&
                Objects.equals(address2.getAddressLine2(), address1.getAddressLine2()) &&
                Objects.equals(address2.getCity(), address1.getCity()) &&
                Objects.equals(address2.getStateProvinceRegion(), address1.getStateProvinceRegion()) &&
                Objects.equals(address2.getPostalCode(), address1.getPostalCode()) &&
                Objects.equals(address2.getIsoCountryAlpha2(), address1.getIsoCountryAlpha2()) &&
                Objects.equals(address2.getIsoCountrySubdivision(), address1.getIsoCountrySubdivision()) &&
                Objects.equals(address2.getPhonePrimary().getPhoneNumber(), address1.getPhonePrimary().getPhoneNumber()) &&
                Objects.equals(address2.getFirstName(), address1.getFirstName()) &&
                Objects.equals(address2.getLastName(), address1.getLastName());
    }
}
