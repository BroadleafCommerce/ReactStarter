/*
 * #%L
 * BroadleafCommerce Common Libraries
 * %%
 * Copyright (C) 2009 - 2016 Broadleaf Commerce
 * %%
 * Licensed under the Broadleaf Fair Use License Agreement, Version 1.0
 * (the "Fair Use License" located  at http://license.broadleafcommerce.org/fair_use_license-1.0.txt)
 * unless the restrictions on use therein are violated and require payment to Broadleaf in which case
 * the Broadleaf End User License Agreement (EULA), Version 1.1
 * (the "Commercial License" located at http://license.broadleafcommerce.org/commercial_license-1.1.txt)
 * shall apply.
 * 
 * Alternatively, the Commercial License may be replaced with a mutually agreed upon license (the "Custom License")
 * between you and Broadleaf Commerce. You may not use this file except in compliance with the applicable license.
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
