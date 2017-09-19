/*
 * #%L
 * React Core Starter
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
