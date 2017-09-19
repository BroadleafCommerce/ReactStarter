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
