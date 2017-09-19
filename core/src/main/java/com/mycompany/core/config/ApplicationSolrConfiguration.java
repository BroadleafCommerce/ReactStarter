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
        return new HttpSolrClient(primarySolrUrl);
    }
    
    @Bean
    public SolrClient reindexSolrClient() {
        return new HttpSolrClient(reindexSolrUrl);
    }
    
    @Bean
    public SolrClient adminSolrClient() {
        return new HttpSolrClient(adminSolrUrl);
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
