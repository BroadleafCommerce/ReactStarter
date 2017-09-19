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
