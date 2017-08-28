package com.mycompany.api.configuration;

import org.apache.catalina.connector.Connector;
import org.broadleafcommerce.common.extensibility.context.merge.Merge;
import org.broadleafcommerce.common.web.BroadleafLocaleResolver;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.boot.context.embedded.EmbeddedServletContainerFactory;
import org.springframework.boot.context.embedded.tomcat.TomcatEmbeddedServletContainerFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;
import org.springframework.context.annotation.Scope;
import com.mycompany.api.web.resolver.BroadleafHeaderLocaleResolver;
import com.mycompany.api.wrapper.ReactAddressWrapper;
import com.mycompany.api.wrapper.ReactCustomerPaymentWrapper;
import com.mycompany.core.config.CoreConfig;
import com.mycompany.core.config.StringFactoryBean;
import java.util.Arrays;
import java.util.List;

/**
 * @author Elbert Bautista (elbertbautista)
 */
@Configuration
@Import({CoreConfig.class, ApiSecurityConfig.class})
@ComponentScan({"org.broadleafcommerce.api.common"})
public class ApiConfig {

    @Bean
    @ConditionalOnProperty("jmx.app.name")
    public StringFactoryBean blJmxNamingBean() {
        return new StringFactoryBean();
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
    public EmbeddedServletContainerFactory tomcatEmbeddedServletContainerFactory(@Value("${http.server.port:8082}") int httpServerPort) {
        TomcatEmbeddedServletContainerFactory tomcat = new TomcatEmbeddedServletContainerFactory();
        tomcat.addAdditionalTomcatConnectors(createStandardConnector(httpServerPort));
        return tomcat;
    }

    private Connector createStandardConnector(int port) {
        Connector connector = new Connector("org.apache.coyote.http11.Http11NioProtocol");
        connector.setPort(port);
        return connector;
    }

    @Bean
    public BroadleafLocaleResolver blLocaleResolver() {
        return new BroadleafHeaderLocaleResolver();
    }

    @Merge("blMessageSourceBaseNames")
    public List<String> customMessages() {
        return Arrays.asList("classpath:messages");
    }

    @Bean(name = "com.broadleafcommerce.rest.api.wrapper.AddressWrapper")
    @Scope("prototype")
    public ReactAddressWrapper reactAddressWrapper() {
        return new ReactAddressWrapper();
    }

    @Bean(name = "com.broadleafcommerce.rest.api.wrapper.CustomerPaymentWrapper")
    @Scope("prototype")
    public ReactCustomerPaymentWrapper reactCustomerPaymentWrapper() {
        return new ReactCustomerPaymentWrapper();
    }




}
