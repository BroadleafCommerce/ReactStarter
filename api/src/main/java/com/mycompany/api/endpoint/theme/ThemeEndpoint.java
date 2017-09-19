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
package com.mycompany.api.endpoint.theme;

import org.broadleafcommerce.common.web.resource.BroadleafDefaultResourceResolverChain;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.core.io.Resource;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.resource.ResourceHttpRequestHandler;
import org.springframework.web.servlet.resource.ResourceResolverChain;
import java.nio.file.Paths;
import java.util.List;
import javax.servlet.http.HttpServletRequest;

/**
 * @author Nick Crum ncrum
 */
@RestController("blThemeEndpoint")
@RequestMapping("/theme")
public class ThemeEndpoint {

    @Autowired
    @Qualifier("blCssResources")
    protected ResourceHttpRequestHandler cssResourceHandler;

    @RequestMapping(value = "/css/{fileName:.+}")
    public Resource getCssThemeFile(HttpServletRequest request,
                                    @PathVariable("fileName") String fileName,
                                    @RequestParam(value = "filePath", defaultValue = "") String filePath) {
        ResourceResolverChain resolverChain = new BroadleafDefaultResourceResolverChain(
                cssResourceHandler.getResourceResolvers());
        List<Resource> locations = cssResourceHandler.getLocations();
        return resolverChain.resolveResource(request, Paths.get(filePath, fileName).toString(), locations);
    }
}
