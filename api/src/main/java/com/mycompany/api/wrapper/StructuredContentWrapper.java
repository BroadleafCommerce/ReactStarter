package com.mycompany.api.wrapper;

import org.broadleafcommerce.common.rest.api.wrapper.APIWrapper;
import org.broadleafcommerce.common.rest.api.wrapper.BaseWrapper;
import org.broadleafcommerce.common.structure.dto.StructuredContentDTO;
import java.util.HashMap;
import java.util.Map;
import javax.servlet.http.HttpServletRequest;
import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;

/**
 * @author Nick Crum ncrum
 */
@XmlRootElement(name = "content")
@XmlAccessorType(value = XmlAccessType.FIELD)
public class StructuredContentWrapper extends BaseWrapper implements APIWrapper<StructuredContentDTO> {

    @XmlElement
    protected Long id;

    @XmlElement
    protected Map<String, String> values;

    @Override
    public void wrapDetails(StructuredContentDTO model, HttpServletRequest request) {
        this.id = model.getId();

        this.values = new HashMap<>();
        for (Map.Entry<String, Object> entry : model.getValues().entrySet()) {
            this.values.put(entry.getKey(), String.valueOf(entry.getValue()));
        }
    }

    @Override
    public void wrapSummary(StructuredContentDTO model, HttpServletRequest request) {
        wrapDetails(model, request);
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Map<String, String> getValues() {
        return values;
    }

    public void setValues(Map<String, String> values) {
        this.values = values;
    }
}