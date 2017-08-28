# React Starter Startup

This document is intended to be a guide to how to startup this react starter project.

## Environment

There are a couple of things you will need to install to ensure your environment can run this application.

1. Install `node` at https://nodejs.org/en/
2. Install `yarn` using `brew install yarn` (test it installed with `yarn --version`)
3. Navigate to `site` directory and run the command `yarn`. This will install all the node dependencies.

## Running the App

Once you have your environment setup, startup the `api` application and then run the `site` application.

1. Run the `api` application by going to `api` and running `mvn spring-boot:run`.
2. Run the `site` application by going to `site` and running `yarn develop`. Locate the app at `localhost:3000`.

> Note: Be sure to startup the `api` application BEFORE you start this application.

## Running for Production

To run the application in "production" mode with server side rendering, simply run
the command `yarn start`. This command will run some build commands to build the
frontend `bundle.js` and the backend `server.js` bundles using webpack. Once it is
done with the build tasks it simply runs the `server.js` script. If you only want
to build the bundles, run the command `yarn build`.
