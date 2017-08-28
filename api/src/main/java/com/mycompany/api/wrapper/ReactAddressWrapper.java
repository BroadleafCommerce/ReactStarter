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
