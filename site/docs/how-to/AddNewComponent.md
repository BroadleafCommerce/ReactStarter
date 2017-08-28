# Add New Component

A component is a part of the web application that has some sort of self-contained
behavior or visuals. A web application is composed of many different components
that work together to provide a cohesive user experience.

### The Basics
For a React application, there are a couple ways one can create a component,
using a function, or an ES6 class.

```js
import React, { Component } from 'react'

// class definition
class MyComponent extends Component {
    render() {
        return (
            <div>My Component</div>
        )
    }
}

// function definition
const MyComponent = () => (
    <div>My Component</div>
)
```

The above two components are exactly the same. React does not yet optimize for
functional components and basically constructs a React Component class, so functional
definition is mostly useful for convenience and it is less verbose.

When deciding between using functional or class definition for a component, you
should consider whether your component has state, or needs access to lifecycle methods.
The Component class allows you to have a stateful component, as well as access to define
useful lifecycle methods like `componentWillMount`, `componentWillReceiveProps`, and `shouldComponentUpdate`.
The React documentation includes a thorough explanation of all the lifecycle functions
and when you might use them.

Another option when defining a component is to create a `PureComponent`. These type
of components are more performant than the normal `Component` class since they do
an efficient shallow comparison of the properties before deciding whether to render.
Only use this type of component class when you really understand what you are doing,
and only when you need to find ways to increase the performance of a component.

### Presentational vs Container components

There are two architectural patterns for designing components in React, Presentational
and Container components. Presentational components are primarily concerned with
how things look and are generally stateless. Container components are primarily
concerned with how things work and can be stateful. Most of the time container
components are composed of a number of presentational components.

```js
class Container extends Component {
    state = {
        open: false
    }

    _toggle = () => this.setState({ open: !this.state.open })

    render() {
        return (
            <Presentational open={false} toggle={this._toggle}/>
        )
    }
}

const Presentational = ({
    open,
    toggle
}) => (
    <div>
        <h1>My Presentational Component</h1>
        <div>
            <button type='button' onClick={e => toggle()}>Toggle</button>

            {open && (
                <div>
                    Only show this when toggled
                </div>
            )}
        </div>
    </div>
)
```

This architectural design pattern allows you to separate concerns around data fetching
and state management from how your application looks and feels. In addition, it allows
easier unit testing of presentational components without having to mock out as much
functionality.

### Components within a Feature

Our prior document about [adding new features](./AddNewFeature.md) covered the
folder structure for our application. When you add components to these features
there are some conventions that should be followed. Here is a folder structure
for a component within a feature:

```
catalog/components
    Product/
        index.js
        Product.js
        Product.scss
```

As you can see there is an `index.js` file. By defining this file, nodejs or webpack
knows to resolve an import of it's parent directory, e.g. `import Product from 'catalog/components/Product'`.
This file is usually just the following:

```js
export {default} from './Product'

// export additional components if needed
export {default, ProductDetails} from './Product'
```

The reason we use this directory structure is to allow us to define a localized
stylesheet, as well as as many helper component files as we need.

### Next

Now that you know how to add new presentational and container components, our next
how-to covers how to [add new Routes](./AddNewRoutes.md) and leverage the power of
react-router v4.
