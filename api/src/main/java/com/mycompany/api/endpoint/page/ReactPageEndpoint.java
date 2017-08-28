package com.mycompany.api.endpoint.page;

import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.broadleafcommerce.rest.api.wrapper.PageWrapper;
import javax.servlet.http.HttpServletRequest;

/**
 * @author Nick Crum ncrum
 */
@RestController
@RequestMapping(value = "/page",
        produces = { MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_XML_VALUE})
public class ReactPageEndpoint extends com.broadleafcommerce.rest.api.endpoint.page.PageEndpoint {

    @Override
    @RequestMapping(value = "", method = RequestMethod.GET)
    public PageWrapper findPageByURI(HttpServletRequest request, @RequestParam String url) {
        return super.findPageByURI(request, url);
    }
}
