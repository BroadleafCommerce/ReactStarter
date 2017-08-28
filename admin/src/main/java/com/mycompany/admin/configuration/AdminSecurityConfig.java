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

import org.broadleafcommerce.common.security.handler.SecurityFilter;
import org.broadleafcommerce.openadmin.security.BroadleafAdminAuthenticationFailureHandler;
import org.broadleafcommerce.openadmin.security.BroadleafAdminAuthenticationSuccessHandler;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.DependsOn;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.authentication.logout.LogoutSuccessHandler;

import javax.annotation.Resource;
import javax.servlet.Filter;

/**
 * @author Elbert Bautista (elbertbautista)
 */
@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(securedEnabled = true, prePostEnabled = true)
@ComponentScan({"org.broadleafcommerce.profile.web.core.security","org.broadleafcommerce.core.web.order.security"})
public class AdminSecurityConfig extends WebSecurityConfigurerAdapter {

    @Configuration
    public static class DependencyConfiguration {

        @Bean
        protected AuthenticationFailureHandler blAdminAuthenticationFailureHandler() {
            return new BroadleafAdminAuthenticationFailureHandler("/login?login_error=true");
        }

        @Bean
        protected AuthenticationSuccessHandler blAdminAuthenticationSuccessHandler() {
            BroadleafAdminAuthenticationSuccessHandler handler = new BroadleafAdminAuthenticationSuccessHandler();
            handler.setDefaultTargetUrl("/loginSuccess");
            handler.setAlwaysUseDefaultTargetUrl(false);
            return handler;
        }

    }

    @Value("${asset.server.url.prefix.internal}")
    protected String assetServerUrlPrefixInternal;

    @Value("${enforce.secure:true}")
    protected boolean enforceSecure;

    @Resource(name="blAdminAuthenticationSuccessHandler")
    protected AuthenticationSuccessHandler successHandler;

    @Resource(name="blAdminAuthenticationFailureHandler")
    protected AuthenticationFailureHandler failureHandler;

    @Resource(name="blAdminLogoutSuccessHandler")
    protected LogoutSuccessHandler logoutSuccessHandler;

    @Resource(name="blAdminCsrfFilter")
    protected Filter adminCsrfFilter;

    @Resource(name="blAdminUserDetailsService")
    protected UserDetailsService adminUserDetailsService;

    @Resource(name="blAdminPasswordEncoder")
    protected PasswordEncoder passwordEncoder;

    @Resource(name = "blAdminAuthenticationProvider")
    protected AuthenticationProvider authenticationProvider;

    @Override
    public void configure(WebSecurity web) throws Exception {
        web
            .ignoring()
            .antMatchers("/**/*.css")
            .antMatchers("/**/*.js")
            .antMatchers("/img/**")
            .antMatchers("/fonts/**")
            .antMatchers("/**/"+assetServerUrlPrefixInternal+"/**")
            .antMatchers("/favicon.ico")
            .antMatchers("/robots.txt");
    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(adminUserDetailsService).passwordEncoder(passwordEncoder);
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
            .authenticationProvider(authenticationProvider)
            .csrf().disable()
            .headers().frameOptions().disable().and()
            .sessionManagement()
                .enableSessionUrlRewriting(false)
                .and()
            .formLogin()
                .permitAll()
                .successHandler(successHandler)
                .failureHandler(failureHandler)
                .loginPage("/login")
                .loginProcessingUrl("/login_admin_post")
                .and()
            .authorizeRequests()
                .antMatchers("/global", "/global-*", "/global-*/**/*")
                .access("hasRole('GLOBAL_ADMIN')")
                .antMatchers("/sendResetPassword", "/forgotUsername", "/forgotPassword", "/resetPassword", "/login")
                .access("permitAll")
                .antMatchers("/**")
                .access("isAuthenticated()")
                .and()
            .requiresChannel()
                .antMatchers("/**")
                .requiresSecure()
                .and()
            .logout()
                .invalidateHttpSession(true)
                .logoutUrl("/adminLogout.htm")
                .logoutSuccessHandler(logoutSuccessHandler)
                .and()
            .portMapper()
                .http(80).mapsTo(443)
                .http(8080).mapsTo(8443)
                .http(8081).mapsTo(8444)
                .and()
            .addFilterBefore(adminCsrfFilter, UsernamePasswordAuthenticationFilter.class);
    }

    /**
     * Don't allow the auto registration of the filter for the main request flow. This filter should be limited
     * to the spring security chain.
     *
     * @param filter the Filter instance to disable in the main flow
     * @return the registration bean that designates the filter as being disabled in the main flow
     */
    @Bean
    @DependsOn("blCacheManager")
    public FilterRegistrationBean blAdminCsrfFilterFilterRegistrationBean(@Qualifier("blAdminCsrfFilter") SecurityFilter filter) {
        FilterRegistrationBean registrationBean = new FilterRegistrationBean(filter);
        registrationBean.setEnabled(false);
        return registrationBean;
    }


}
