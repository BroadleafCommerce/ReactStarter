/*
 * #%L
 * React Core Starter
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
/**
 * 
 */
package com.mycompany.core.config;

import org.broadleafcommerce.common.email.service.info.EmailInfo;
import org.broadleafcommerce.common.email.service.message.MessageCreator;
import org.broadleafcommerce.common.email.service.message.NullMessageCreator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.mail.javamail.JavaMailSender;

/**
 * Shared email configuration
 * 
 * @author Phillip Verheyden (phillipuniverse)
 */
@Configuration
public class CoreEmailConfig {

    /**
     * A dummy mail sender has been set to send emails for testing purposes only
     * To view the emails sent use "DevNull SMTP" (download separately) with the following setting: 
     *   Port: 30000
     */
//    @Bean
//    public MailSender blMailSender() {
//        JavaMailSenderImpl sender = new JavaMailSenderImpl();
//        sender.setHost("localhost");
//        sender.setPort("30000");
//        sender.setProtocol("smtp");
//        Properties javaMailProps = new Properties();
//        javaMailProps.setProperty("mail.smtp.starttls.enable", true);
//        javaMailProps.setProperty("mail.smtp.timeout", 25000);
//        sender.setJavaMailProperties(javaMailProps);
//    }
    
    /**
     * Uncomment this bean to send real emails
     */
//    @Bean
//    @Autowired
//    public MessageCreator blMessageCreator(@Qualifier("blEmailTemplateEngine") TemplateEngine tlTemplateEngine, @Qualifier("blMailSender") MailSender mailSender) {
//        return new ThymeleafMessageCreator(tlTemplateEngine, mailSender);
//    }
    
    @Bean
    @Autowired
    public MessageCreator blMessageCreator(@Qualifier("blMailSender") JavaMailSender mailSender) {
        return new NullMessageCreator(mailSender);
    }
    
    @Bean
    public EmailInfo blEmailInfo() {
        EmailInfo info = new EmailInfo();
        info.setFromAddress("support@mycompany.com");
        info.setSendAsyncPriority("2");
        info.setSendEmailReliableAsync("false");
        return info;
    }
    
    @Bean
    public EmailInfo blRegistrationEmailInfo() {
        EmailInfo info = blEmailInfo();
        info.setSubject("You have successfully registered!");
        info.setEmailTemplate("register-email");
        return info;
    }
    
    @Bean
    public EmailInfo blForgotPasswordEmailInfo() {
        EmailInfo info = blEmailInfo();
        info.setSubject("Reset password request");
        info.setEmailTemplate("resetPassword-email");
        return info;
    }
    
    @Bean
    public EmailInfo blOrderConfirmationEmailInfo() {
        EmailInfo info = blEmailInfo();
        info.setSubject("Your order with The Heat Clinic");
        info.setEmailTemplate("orderConfirmation-email");
        return info;
    }
    
    @Bean
    public EmailInfo blFulfillmentOrderTrackingEmailInfo() {
        EmailInfo info = blEmailInfo();
        info.setSubject("Your order with The Heat Clinic Has Shipped");
        info.setEmailTemplate("fulfillmentOrderTracking-email");
        return info;
    }
    
    @Bean
    public EmailInfo blReturnAuthorizationEmailInfo() {
        EmailInfo info = blEmailInfo();
        info.setSubject("Your return with The Heat Clinic");
        info.setEmailTemplate("returnAuthorization-email");
        return info;
    }
    
    @Bean
    public EmailInfo blReturnConfirmationEmailInfo() {
        EmailInfo info = blEmailInfo();
        info.setSubject("Your return with The Heat Clinic");
        info.setEmailTemplate("returnConfirmation-email");
        return info;
    }
}
