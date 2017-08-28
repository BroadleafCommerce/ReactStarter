package com.mycompany.api.configuration;

import org.broadleafcommerce.common.web.BroadleafRequestFilter;
import org.broadleafcommerce.common.web.filter.FilterOrdered;
import org.broadleafcommerce.profile.web.site.security.SessionFixationProtectionFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.access.channel.ChannelDecisionManagerImpl;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.broadleafcommerce.authapi.filter.AccessTokenAuthenticationFilter;
import org.broadleafcommerce.authapi.provider.AccessTokenAuthenticationProvider;
import org.broadleafcommerce.authapi.provider.RefreshTokenAuthenticationProvider;
import org.broadleafcommerce.authapi.service.ApiAuthenticationRequestFactory;

/**
 * @author Elbert Bautista (elbertbautista)
 * @author Nick Crum (ncrum)
 */
@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(securedEnabled = true, prePostEnabled = true)
public class ApiSecurityConfig extends WebSecurityConfigurerAdapter {

    @Value("${asset.server.url.prefix.internal}")
    protected String assetServerUrlPrefixInternal;

    protected final AccessTokenAuthenticationProvider accessTokenAuthenticationProvider;
    protected final RefreshTokenAuthenticationProvider refreshTokenAuthenticationProvider;
    protected final PasswordEncoder passwordEncoder;
    protected final UserDetailsService userDetailsService;
    protected final ApiAuthenticationRequestFactory apiAuthenticationRequestFactory;

    @Autowired
    public ApiSecurityConfig(AccessTokenAuthenticationProvider accessTokenAuthenticationProvider,
                             RefreshTokenAuthenticationProvider refreshTokenAuthenticationProvider,
                             PasswordEncoder passwordEncoder, UserDetailsService userDetailsService,
                             ApiAuthenticationRequestFactory apiAuthenticationRequestFactory) {
        this.accessTokenAuthenticationProvider = accessTokenAuthenticationProvider;
        this.refreshTokenAuthenticationProvider = refreshTokenAuthenticationProvider;
        this.passwordEncoder = passwordEncoder;
        this.userDetailsService = userDetailsService;
        this.apiAuthenticationRequestFactory = apiAuthenticationRequestFactory;
    }

    @Bean(name="blAuthenticationManager")
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }

    @Bean
    public AuthenticationProvider blAuthenticationProvider() {
        DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
        provider.setUserDetailsService(userDetailsService);
        provider.setPasswordEncoder(passwordEncoder);
        return provider;
    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.authenticationProvider(blAuthenticationProvider())
            .authenticationProvider(accessTokenAuthenticationProvider)
            .authenticationProvider(refreshTokenAuthenticationProvider);
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
            .csrf().disable()
            .authorizeRequests()
                .antMatchers(HttpMethod.POST, "/api/**/login").permitAll()
                .antMatchers(HttpMethod.GET, "/api/**/customer/current").permitAll()
                .antMatchers(
                        "/api/**/wishlist",
                        "/api/**/customer").authenticated()
                .antMatchers("/api/**").permitAll()
                .and()
            .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
            .requiresChannel()
                .anyRequest()
                .requires(ChannelDecisionManagerImpl.ANY_CHANNEL)
            .and()
                .addFilterBefore(apiAuthenticationRequestFactory.buildAccessTokenAuthenticationFilter("/**", authenticationManagerBean()), UsernamePasswordAuthenticationFilter.class)
                .addFilterBefore(apiAuthenticationRequestFactory.buildRefreshTokenAuthenticationFilter("/api/**/refresh-token", authenticationManagerBean()), AccessTokenAuthenticationFilter.class)
                .addFilterBefore(apiAuthenticationRequestFactory.buildLoginFilter("/api/**/login", authenticationManagerBean()), AccessTokenAuthenticationFilter.class)
                .addFilterBefore(apiAuthenticationRequestFactory.buildRegisterFilter("/api/**/register", authenticationManagerBean()), AccessTokenAuthenticationFilter.class);
    }

    @Bean
    public BroadleafRequestFilter blPostRequestFilter() {
        return new BroadleafRequestFilter() {
            @Override
            public int getOrder() {
                return FilterOrdered.POST_SECURITY_HIGH;
            }
        };
    }


    /**
     * Don't allow the auto registration of the filter for the main API request flow
     *
     * @param filter the Filter instance to disable in the main flow
     * @return the registration bean that designates the filter as being disabled in the main flow
     */
    @Bean
    public FilterRegistrationBean blSessionFixationProtectionFilterFilterRegistrationBean(@Qualifier("blSessionFixationProtectionFilter") SessionFixationProtectionFilter filter) {
        FilterRegistrationBean registrationBean = new FilterRegistrationBean(filter);
        registrationBean.setEnabled(false);
        return registrationBean;
    }
    
}
