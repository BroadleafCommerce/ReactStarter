/*
 * #%L
 * Reference Site Core
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
/*
 * Copyright 2008-2013 the original author or authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *        http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package com.broadleafcommerce.demo.service.search;

import org.apache.commons.lang3.ArrayUtils;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.broadleafcommerce.common.config.service.SystemPropertiesService;
import org.broadleafcommerce.common.event.ReindexEvent;
import org.broadleafcommerce.common.exception.ServiceException;
import org.broadleafcommerce.core.search.service.solr.index.SolrIndexService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.context.event.EventListener;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.io.IOException;


/**
 * This class holds methods that are used to clean up parts of the Solr index specifically associated with the private 
 * demo functionality.
 * 
 * @author Andre Azzolini (apazzolini)
 */
@Service("pdSolrIndexCleanupService")
public class SolrIndexCleanupServiceImpl implements SolrIndexCleanupService {
    protected static final Log LOG = LogFactory.getLog(SolrIndexCleanupServiceImpl.class);

    protected static final String DDL_PROP = "blPU.hibernate.hbm2ddl.auto";
    protected static final String[] QUAL_VALUES = new String[] { "create", "create-drop" };

    @Autowired(required = false)
    protected SolrIndexService sis;
    protected final ApplicationEventPublisher publisher;
    protected final SystemPropertiesService propService;

    @Autowired
    public SolrIndexCleanupServiceImpl(ApplicationEventPublisher publisher, SystemPropertiesService propService) {
        this.publisher = publisher;
        this.propService = propService;
    }

    @Override
    @Transactional(value = "blTransactionManager", readOnly = true)
    @EventListener(ContextRefreshedEvent.class)
    @Order(Ordered.LOWEST_PRECEDENCE)
    public void rebuildIndexAtStartupIfNecessary() throws ServiceException, IOException {
        if (sis != null) {
            String propVal = propService.resolveSystemProperty(DDL_PROP).toLowerCase();
            if (ArrayUtils.contains(QUAL_VALUES, propVal)) {
                sis.rebuildIndex();
                publisher.publishEvent(new ReindexEvent(this));
                LOG.info("All indexes rebuilt at startup because value was " + propVal);
            } else {
                LOG.info("Not rebuilding indexes because value was " + propVal);
            }
        }
    }

}
