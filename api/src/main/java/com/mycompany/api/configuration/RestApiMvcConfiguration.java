package com.mycompany.api.configuration;

import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.service.ResponseMessage;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spi.service.OperationBuilderPlugin;
import springfox.documentation.spi.service.contexts.OperationContext;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

import org.broadleafcommerce.common.extensibility.context.merge.Merge;
import org.broadleafcommerce.common.web.controller.annotation.EnableFrameworkRestControllers;
import org.broadleafcommerce.common.web.filter.FilterOrdered;
import org.broadleafcommerce.common.web.filter.IgnorableOpenEntityManagerInViewFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.ApplicationContext;
import org.springframework.context.MessageSource;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.ImportResource;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.orm.jpa.support.OpenEntityManagerInViewFilter;
import org.springframework.security.web.session.HttpSessionEventPublisher;
import org.springframework.web.servlet.HandlerMapping;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.handler.SimpleUrlHandlerMapping;
import com.broadleafcommerce.rest.api.BroadleafRestApiMvcConfiguration;
import java.util.Collections;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Properties;
import java.util.Set;

@Configuration
@EnableSwagger2
@ComponentScan("com.community.api")
// Generally we do not want any of the auto-added BLC servlet XML in the API, but this allows us
// to serve images from the API application
@ImportResource("classpath:applicationContext-servlet-cms-contentClient.xml")
public class RestApiMvcConfiguration extends BroadleafRestApiMvcConfiguration {

    @Configuration
    @EnableFrameworkRestControllers
    public static class EnableBroadleafRestControllers {}

    @Autowired
    protected ApplicationContext appContext;

    /**
     * Setup the "blPU" entity manager on the request thread using the entity-manager-in-view pattern
     */
    @Bean
    public FilterRegistrationBean openEntityManagerInViewFilterFilterRegistrationBean() {
        FilterRegistrationBean registrationBean = new FilterRegistrationBean();
        OpenEntityManagerInViewFilter openEntityManagerInViewFilter = new IgnorableOpenEntityManagerInViewFilter();
        registrationBean.setFilter(openEntityManagerInViewFilter);
        registrationBean.setName("openEntityManagerInViewFilter");
        registrationBean.setOrder(FilterOrdered.PRE_SECURITY_HIGH);
        return registrationBean;
    }
    
    @Bean
    public HttpSessionEventPublisher sessionEventPublisher() {
        return new HttpSessionEventPublisher();
    }

    @Bean
    public Docket globalApi() {
        return new Docket(DocumentationType.SWAGGER_2)
                .select()
                  .apis(RequestHandlerSelectors.any())
                  .paths(PathSelectors.any())
                  .build()
                .useDefaultResponseMessages(false)
                .apiInfo(apiInfo());
    }

    protected ApiInfo apiInfo () {
        return new ApiInfoBuilder().title("Broadleaf Commerce API")
                .description("The default Broadleaf Commerce APIs")
                .version("v1")
                .build();
    }

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("swagger-ui.html")
                .addResourceLocations("classpath:/META-INF/resources/");

        registry.addResourceHandler("/webjars/**")
                .addResourceLocations("classpath:/META-INF/resources/webjars/");

        registry.addResourceHandler("/images/favicon-32x32.png")
                .addResourceLocations("classpath:/META-INF/resources/webjars/images/favicon-32x32.png");

        registry.addResourceHandler("/images/favicon-16x16.png")
                .addResourceLocations("classpath:/META-INF/resources/webjars/images/favicon-16x16.png");
    }

    @Merge("blImageLocations")
    public List<String> defaultThemeImageLocations() {
        return Collections.singletonList("classpath:/img/");
    }

    @Bean
    public HandlerMapping staticResourcesHandlerMapping() {
        SimpleUrlHandlerMapping resourceMapping = new SimpleUrlHandlerMapping();
        resourceMapping.setOrder(-10);
        Properties mappings = new Properties();
        mappings.put("/img/**", "blImageResources");
        mappings.put("/fonts/**", "blFontResources");
        resourceMapping.setMappings(mappings);
        return resourceMapping;
    }

    @Merge("blCssLocations")
    public List<String> additionalCssLocations() {
        return Collections.singletonList("classpath:/css/");
    }

    /**
     * Broadleaf Commerce comes with an Image Server that allows you to manipulate images.   For example, the
     *  demo includes a high resolution image for each product that is reduced in size for browsing operations
     */
    @Merge("blStaticMapNamedOperations")
    public Map<String, Map<String, String>> customImageOperations() {
        Map<String, Map<String, String>> operations = new HashMap<>();
        Map<String, String> browseOperation = new HashMap<>();
        browseOperation.put("resize-width-amount", "400");
        browseOperation.put("resize-height-amount", "400");
        browseOperation.put("resize-high-quality", "false");
        browseOperation.put("resize-maintain-aspect-ratio", "true");
        browseOperation.put("resize-reduce-only", "true");
        operations.put("browse", browseOperation);

        Map<String, String> thumbnailOperation = new HashMap<>();
        thumbnailOperation.put("resize-width-amount", "60");
        thumbnailOperation.put("resize-height-amount", "60");
        thumbnailOperation.put("resize-high-quality", "false");
        thumbnailOperation.put("resize-maintain-aspect-ratio", "true");
        thumbnailOperation.put("resize-reduce-only", "true");
        operations.put("thumbnail", thumbnailOperation);

        return operations;
    }

    @Bean
    public TranslationOperationBuilderPlugin translationPlugin() {
        return new TranslationOperationBuilderPlugin();
    }

    @Order(Ordered.LOWEST_PRECEDENCE)
    public static class TranslationOperationBuilderPlugin implements OperationBuilderPlugin {

        @Autowired
        protected MessageSource translator;

        @Override
        public boolean supports(DocumentationType delimiter) {
            return true;
        }

        @Override
        public void apply(OperationContext context) {
            Set<ResponseMessage> messages = context.operationBuilder().build().getResponseMessages();
            Set<ResponseMessage> translated = new HashSet<>();
            for (ResponseMessage untranslated : messages) {
                String translation = translator.getMessage(untranslated.getMessage(), null, untranslated.getMessage(), null);
                translated.add(new ResponseMessage(untranslated.getCode(),
                    translation,
                    untranslated.getResponseModel(),
                    untranslated.getHeaders()));
            }
            context.operationBuilder().responseMessages(translated);
        }

    }

}
