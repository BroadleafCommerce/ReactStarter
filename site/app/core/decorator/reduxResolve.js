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
