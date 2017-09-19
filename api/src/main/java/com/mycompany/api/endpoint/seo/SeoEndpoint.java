/*
 * #%L
 * React API Starter
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
package com.mycompany.api.endpoint.seo;

import org.broadleafcommerce.common.page.dto.PageDTO;
import org.broadleafcommerce.core.catalog.domain.Category;
import org.broadleafcommerce.core.catalog.domain.Product;
import org.broadleafcommerce.core.catalog.service.CatalogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.broadleafcommerce.rest.api.service.PageRequestService;
import java.util.HashMap;
import java.util.Map;
import javax.servlet.http.HttpServletRequest;

/**
 * @author Nick Crum ncrum
 */
@RestController
@RequestMapping(value = "/seo")
public class SeoEndpoint {

    protected final CatalogService catalogService;
    protected final PageRequestService pageRequestService;

    @Autowired
    public SeoEndpoint(PageRequestService pageRequestService, CatalogService catalogService) {
        this.pageRequestService = pageRequestService;
        this.catalogService = catalogService;
    }

    @RequestMapping
    public Map<String, String> getSeoProperties(HttpServletRequest request,
                                                @RequestParam("entityType") String entityType,
                                                @RequestParam("entityURI") String entityURI) {
        Map<String, String> seoProperties = new HashMap<>();
        switch(EntityType.valueOf(entityType)) {
            case PRODUCT:
                Product product = catalogService.findProductByURI(entityURI);
                if (product != null) {
                    seoProperties.put("title", product.getMetaTitle() != null ? product.getMetaTitle() : product.getName());
                    seoProperties.put("description", product.getMetaDescription() != null ? product.getMetaDescription() : product.getLongDescription());
                    seoProperties.put("canonicalUrl", product.getCanonicalUrl() != null ? product.getCanonicalUrl() : product.getUrl());
                }
                break;
            case CATEGORY:
                Category category = catalogService.findCategoryByURI(entityURI);
                if (category != null) {
                    seoProperties.put("title", category.getMetaTitle() != null ? category.getMetaTitle() : category.getName());
                    seoProperties.put("description", category.getMetaDescription() != null ? category.getMetaDescription() : category.getLongDescription());
                }
                break;
            case PAGE:
                PageDTO pageDTO = pageRequestService.findPageByURI(request, entityURI);
                if (pageDTO != null) {
                    Map<String, String> pageAttributes = pageDTO.getPageAttributes();
                    seoProperties.put("title", pageAttributes.get("title"));
                    seoProperties.put("description", pageAttributes.get("metaDescription"));
                }
                break;
            default:
        }

        return seoProperties;
    }

    private enum EntityType {
        PRODUCT,
        CATEGORY,
        PAGE
    }
}
