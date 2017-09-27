/*
 * #%L
 * React Site Starter
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
import PropTypes from 'prop-types';

import React from 'react';
export default {
    ...PropTypes,
    money : PropTypes.shape({
        amount: PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.string,
        ]).isRequired,
        currency: PropTypes.string.isRequired,
    }),
    media : PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string,
        url: PropTypes.string.isRequired,
        altText: PropTypes.string,
        tags: PropTypes.string,
    })
}
