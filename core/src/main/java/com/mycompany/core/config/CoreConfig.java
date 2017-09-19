/*
 * #%L
 * BroadleafCommerce Common Libraries
 * %%
 * Copyright (C) 2009 - 2016 Broadleaf Commerce
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
package com.mycompany.core.config;

import org.broadleafcommerce.common.extensibility.context.merge.Merge;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.ComponentScan.Filter;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.FilterType;

import com.broadleafcommerce.react.util.ExposedBroadleafMergeResourceBundleMessageSource;
import com.mycompany.core.workflow.checkout.SendOrderConfirmationEmailActivity;

import java.util.Arrays;
import java.util.List;

/**
 * @author Jeff Fischer
 */
@Configuration
@ComponentScan(value = "com.broadleafcommerce.demo",
    excludeFilters = @Filter(type = FilterType.REGEX, pattern = "com.broadleafcommerce.demo.admin.*"))
@ComponentScan({"com.mycompany.core", "com.broadleafcommerce.react"})
public class CoreConfig {
    
    @Merge("blCheckoutWorkflowActivities")
    public List<?> customCheckoutActivities(SendOrderConfirmationEmailActivity confirmationEmailActivity) {
        return Arrays.asList(confirmationEmailActivity);
    }

    @Autowired
    @Bean
    public ExposedBroadleafMergeResourceBundleMessageSource messageSource(@Value("${messages.useCodeAsDefaultMessage}") boolean useCodeAsDefaultMessage, @Value("${messages.cacheSeconds}") int cacheSeconds) {
        ExposedBroadleafMergeResourceBundleMessageSource messageSource = new ExposedBroadleafMergeResourceBundleMessageSource();
        messageSource.setUseCodeAsDefaultMessage(useCodeAsDefaultMessage);
        messageSource.setCacheSeconds(cacheSeconds);
        return messageSource;
    }

}
