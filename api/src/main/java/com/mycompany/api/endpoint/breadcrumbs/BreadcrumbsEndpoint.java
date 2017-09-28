/*
 * #%L
 * React API Starter
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
