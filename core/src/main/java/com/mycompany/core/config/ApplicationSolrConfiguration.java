/*
 * #%L
 * React Core Starter
 * %%
 * Copyright (C) 2009 - 2017 Broadleaf Commerce
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
/**
 * 
 */
package com.mycompany.core.config;

import org.apache.solr.client.solrj.SolrClient;
import org.apache.solr.client.solrj.impl.HttpSolrClient;
import org.broadleafcommerce.core.search.service.SearchService;
import org.broadleafcommerce.core.search.service.solr.SolrConfiguration;
import org.broadleafcommerce.core.search.service.solr.SolrSearchServiceImpl;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;

/**
 * 
 * 
 * @author Phillip Verheyden (phillipuniverse)
 */
@Component
public class ApplicationSolrConfiguration {

    @Value("${solr.url.primary}")
    protected String primarySolrUrl;
    
    @Value("${solr.url.reindex}")
    protected String reindexSolrUrl;
    
    @Value("${solr.url.admin}")
    protected String adminSolrUrl;
    
    @Bean
    public SolrClient primarySolrClient() {
        return new HttpSolrClient.Builder(primarySolrUrl).build();
    }
    
    @Bean
    public SolrClient reindexSolrClient() {
        return new HttpSolrClient.Builder(reindexSolrUrl).build();
    }
    
    @Bean
    public SolrClient adminSolrClient() {
        return new HttpSolrClient.Builder(adminSolrUrl).build();
    }
    
    @Bean
    public SolrConfiguration blCatalogSolrConfiguration() throws IllegalStateException {
        return new SolrConfiguration(primarySolrClient(), reindexSolrClient(), adminSolrClient());
    }
    
    @Bean
    protected SearchService blSearchService() {
        return new SolrSearchServiceImpl();
    }
    
}
