package com.mycompany.api.endpoint.i18n;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import com.broadleafcommerce.react.util.ExposedBroadleafMergeResourceBundleMessageSource;
import com.broadleafcommerce.rest.api.endpoint.BaseEndpoint;
import java.util.Locale;
import java.util.Properties;

/**
 * @author Nick Crum ncrum
 */
@RestController
@RequestMapping("/messages")
public class MessageEndpoint extends BaseEndpoint {

    @Autowired
    protected ExposedBroadleafMergeResourceBundleMessageSource messageSource;

    @RequestMapping(value = "/{locale}.json", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public Properties getMessageJson(@PathVariable(value = "locale") String locale) {
        return messageSource.getLocaleMessages(Locale.forLanguageTag(locale));
    }
}
