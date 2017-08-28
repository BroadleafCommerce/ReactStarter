package com.broadleafcommerce.react.util;

import org.broadleafcommerce.common.util.BroadleafMergeResourceBundleMessageSource;
import java.util.Locale;
import java.util.Properties;

/**
 * @author Nick Crum ncrum
 */
public class ExposedBroadleafMergeResourceBundleMessageSource extends BroadleafMergeResourceBundleMessageSource {

    public Properties getLocaleMessages(Locale locale) {
        PropertiesHolder propertiesHolder = getMergedProperties(locale);
        return propertiesHolder.getProperties();
    }
}
