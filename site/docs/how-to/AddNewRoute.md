# Add a New Route

A route is a part of the application that renders when the user transitions to
a certain url. We use the `react-router` library for handling routing in our
application. This library provides straightforward component-driven patterns
for adding routing to an application.

Adding a new Route using `react-router` is as simple as this:

```js
import { Route } from 'react-router-dom'
import MyRoute from './MyRoute'

const App = () => (
    <div>
        <Route path='/my-route' component={MyRoute}/>
    </div>
)
```

There is better and more extensive at the [react training website](https://reacttraining.com/react-router/).
For our application, you will primarily need to add routes when adding new pages.
This can be done by opening up `core/components/Root.js`, and adding your new `Route`
to the `Root` component.
