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
/**
 * 
 */
package com.mycompany.api.endpoint.util;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;

import io.swagger.annotations.ApiOperation;
import springfox.documentation.spring.web.plugins.DocumentationPluginsBootstrapper;

/**
 * Hot-reloads the documentation in the current running context
 * 
 * @author Phillip Verheyden (phillipuniverse)
 */
@RestController
public class SwaggerDocsReloadEndpoint {

    @Resource
    protected DocumentationPluginsBootstrapper swaggerDocs;
    
    @ApiOperation(value = "Hot-reloads the Swagger documentation in the running context")
    @RequestMapping("/docsreload")
    public String reload() {
        swaggerDocs.stop();
        swaggerDocs.start();
        return "Swagger docs successfully reloaded!";
    }
}
