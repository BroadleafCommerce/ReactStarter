/*
 * #%L
 * BroadleafCommerce Common Libraries
 * %%
 * Copyright (C) 2009 - 2016 Broadleaf Commerce
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
