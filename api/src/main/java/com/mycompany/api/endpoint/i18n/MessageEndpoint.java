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
