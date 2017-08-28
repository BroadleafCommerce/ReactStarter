# How to Add a Feature

A `feature` is a set of components that work together to provide an experience. For example, the `menu` feature is responsible for providing anything to do with rendering the primary Menu for the website.

Follow these steps when adding a new feature:
1. Do you actually need a new feature? If you are looking to add a Product page, just put it under the `catalog` feature.
2. Create a directory off the root `app/` directory with the name of your feature.
3. Create directories `components/`, `actions/`, and `reducers/` in this new directory.

There, now you should be good to go and you can import components from feature like so: `import Feature from 'feature/components/Feature'`

See [AddNewComponent](./AddNewComponent.md) for a guide on how to a add a new Component to a feature!
