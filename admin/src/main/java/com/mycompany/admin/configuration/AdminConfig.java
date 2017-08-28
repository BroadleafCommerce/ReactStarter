/*
 * #%L
 * Reference Site Admin
 * %%
 * Copyright (C) 2009 - 2017 Broadleaf Commerce
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
package com.mycompany.admin.configuration;

import org.apache.catalina.connector.Connector;
import org.broadleafcommerce.common.extensibility.context.merge.Merge;
import org.broadleafcommerce.common.web.filter.FilterOrdered;
import org.broadleafcommerce.common.web.filter.IgnorableOpenEntityManagerInViewFilter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.boot.context.embedded.EmbeddedServletContainerFactory;
import org.springframework.boot.context.embedded.tomcat.TomcatEmbeddedServletContainerFactory;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;
import org.springframework.context.annotation.ImportResource;
import org.springframework.orm.jpa.support.OpenEntityManagerInViewFilter;

import com.mycompany.core.config.CoreConfig;
import com.mycompany.core.config.StringFactoryBean;

import java.util.Arrays;
import java.util.List;

/**
 * @author Elbert Bautista (elbertbautista)
 */
@Configuration
@Import({
        CoreConfig.class,
        AdminSecurityConfig.class
})
@ImportResource({
        "classpath:applicationContext-admin.xml"
})
public class AdminConfig {

    @Bean
    @ConditionalOnProperty("jmx.app.name")
    public StringFactoryBean blJmxNamingBean() {
        return new StringFactoryBean();
    }
    
    @Merge("blMergedCacheConfigLocations")
    public List<String> adminOverrideCache() {
        return Arrays.asList("classpath:bl-override-ehcache-admin.xml");
    }

    /**
     * Setup the "blEventPU" entity manager on the request thread using the entity-manager-in-view pattern
     *
     * @return
     */
    @Bean
    public FilterRegistrationBean openEventEntityManagerInViewFilterFilterRegistrationBean() {
        FilterRegistrationBean registrationBean = new FilterRegistrationBean();
        OpenEntityManagerInViewFilter openEventEntityManagerInViewFilter = new IgnorableOpenEntityManagerInViewFilter();
        openEventEntityManagerInViewFilter.setEntityManagerFactoryBeanName("blEntityManagerFactoryEventInfo");
        registrationBean.setFilter(openEventEntityManagerInViewFilter);
        registrationBean.setName("openEventEntityManagerInViewFilter");
        registrationBean.setOrder(FilterOrdered.PRE_SECURITY_HIGH);
        return registrationBean;
    }


    /**
     * Spring Boot does not support the configuration of both an HTTP connector and an HTTPS connector via properties.
     * In order to have both, we’ll need to configure one of them programmatically (HTTP).
     * Below is the recommended approach according to the Spring docs:
     * {@link https://github.com/spring-projects/spring-boot/blob/1.5.x/spring-boot-docs/src/main/asciidoc/howto.adoc#configure-ssl}
     * @param httpServerPort
     * @return EmbeddedServletContainerFactory
     */
    @Bean
    public EmbeddedServletContainerFactory tomcatEmbeddedServletContainerFactory(@Value("${http.server.port:8081}") int httpServerPort) {
        TomcatEmbeddedServletContainerFactory tomcat = new TomcatEmbeddedServletContainerFactory();
        tomcat.addAdditionalTomcatConnectors(createStandardConnector(httpServerPort));
        return tomcat;
    }

    private Connector createStandardConnector(int port) {
        Connector connector = new Connector("org.apache.coyote.http11.Http11NioProtocol");
        connector.setPort(port);
        return connector;
    }

}

