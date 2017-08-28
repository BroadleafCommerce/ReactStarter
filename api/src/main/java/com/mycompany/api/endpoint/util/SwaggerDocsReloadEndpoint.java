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
