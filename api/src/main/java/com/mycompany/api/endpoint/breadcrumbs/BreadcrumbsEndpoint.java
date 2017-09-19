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
package com.mycompany.api.endpoint.breadcrumbs;

import org.broadleafcommerce.common.breadcrumbs.dto.BreadcrumbDTO;
import org.broadleafcommerce.common.breadcrumbs.dto.BreadcrumbDTOType;
import org.broadleafcommerce.common.breadcrumbs.service.BreadcrumbService;
import org.broadleafcommerce.core.catalog.domain.Category;
import org.broadleafcommerce.core.catalog.domain.Product;
import org.broadleafcommerce.core.catalog.service.CatalogService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import java.util.ArrayList;
import java.util.List;
import javax.servlet.http.HttpServletRequest;

/**
 * @author Nick Crum ncrum
 */
@RestController
@RequestMapping("/breadcrumbs")
public class BreadcrumbsEndpoint {

    protected final CatalogService catalogService;
    protected final BreadcrumbService breadcrumbService;

    public BreadcrumbsEndpoint(CatalogService catalogService, BreadcrumbService breadcrumbService) {
        this.catalogService = catalogService;
        this.breadcrumbService = breadcrumbService;
    }

    @RequestMapping
    public List<BreadcrumbDTO> getBreadcrumbs(HttpServletRequest request,
                                              @RequestParam("entityURI") String entityURI,
                                              @RequestParam("entityType") String entityType) {
        List<BreadcrumbDTO> breadcrumbs = new ArrayList<>();
        switch(EntityType.valueOf(entityType)) {
            case PRODUCT:
                Product product = catalogService.findProductByURI(entityURI);
                if (product != null) {
                    breadcrumbs.addAll(buildParentBreadcrumbs(product.getCategory()));
                    breadcrumbs.add(buildCategoryBreadcrumb(product.getCategory()));
                }
                break;
            case CATEGORY:
                Category category = catalogService.findCategoryByURI(entityURI);
                if (category != null) {
                    breadcrumbs.addAll(buildParentBreadcrumbs(category));
                }
                break;
            default:
        }

        return breadcrumbs;
    }

    protected BreadcrumbDTO buildCategoryBreadcrumb(Category category) {
        BreadcrumbDTO categoryDto = new BreadcrumbDTO();
        categoryDto.setText(category.getName());
        categoryDto.setLink("/browse" + category.getUrl());
        categoryDto.setType(BreadcrumbDTOType.CATEGORY);
        return categoryDto;
    }

    protected List<BreadcrumbDTO> buildParentBreadcrumbs(Category category) {
        List<BreadcrumbDTO> breadcrumbDTOs = new ArrayList<>();

        Category parentCategory = category.getParentCategory();
        if (parentCategory != null) { // prevent recursion
            BreadcrumbDTO dto = buildCategoryBreadcrumb(parentCategory);
            breadcrumbDTOs.addAll(buildParentBreadcrumbs(parentCategory));
            breadcrumbDTOs.add(dto);
        }

        return breadcrumbDTOs;
    }

    private enum EntityType {
        PRODUCT,
        CATEGORY
    }
}
