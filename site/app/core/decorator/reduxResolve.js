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
import React, { Component, PropTypes } from 'react';

/**
 * @resolve((resolver, props) => {
 *     resolver.resolve(() => myReduxAction())
 * })
 */
export function resolve(doResolve) {
  return function decorate(DecoratingComponent) {
    class DecoratedComponent extends Component {
      static contextTypes = {
        store: PropTypes.object.isRequired,
      };

      componentWillMount() {
        const { resolver, getState } = this.context.store;
        doResolve(resolver, this.props, getState);
      }

      render() {
        return <DecoratingComponent {...this.props} />;
      }
    }

    return DecoratedComponent;
  };
}
