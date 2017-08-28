package com.mycompany.api.web.resolver;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.broadleafcommerce.common.locale.domain.Locale;
import org.broadleafcommerce.common.locale.service.LocaleService;
import org.broadleafcommerce.common.web.BroadleafLocaleResolver;
import org.springframework.web.context.request.ServletWebRequest;
import org.springframework.web.context.request.WebRequest;
import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

/**
 * @author Nick Crum ncrum
 */
public class BroadleafHeaderLocaleResolver implements BroadleafLocaleResolver {

    private final Log LOG = LogFactory.getLog(BroadleafHeaderLocaleResolver.class);

    public static final String DEFAULT_HEADER_NAME = "X-Locale";

    @Resource(name = "blLocaleService")
    private LocaleService localeService;

    protected String headerName;

    public BroadleafHeaderLocaleResolver() {
        setHeaderName(DEFAULT_HEADER_NAME);
    }

    @Override
    public Locale resolveLocale(HttpServletRequest request) {
        return resolveLocale(new ServletWebRequest(request));
    }

    @Override
    public Locale resolveLocale(WebRequest request) {
        Locale locale = null;

        if (request.getHeader(getHeaderName()) != null) {
            String localeCode = request.getHeader(getHeaderName());
            locale = localeService.findLocaleByCode(localeCode);

            if (locale == null) {
                // Try again, because Broadleaf currently uses underscore rather than the proper hyphen for locale codes
                locale = localeService.findLocaleByCode(localeCode.replace("-", "_"));
            }
            if (LOG.isTraceEnabled()) {
                LOG.trace("Attempt to find locale by param " + localeCode + " resulted in " + locale);
            }
        }

        // Finally, use the default
        if (locale == null) {
            locale = localeService.findDefaultLocale();
            if (LOG.isTraceEnabled()) {
                LOG.trace("Locale set to default locale " + locale);
            }
        }

        return locale;
    }

    public String getHeaderName() {
        return headerName;
    }

    protected void setHeaderName(String headerName) {
        this.headerName = headerName;
    }
}
