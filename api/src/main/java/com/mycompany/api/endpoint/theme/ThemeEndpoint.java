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
