## Broadleaf Commerce Spring Boot React Starter

This Maven project is meant to be used as a solid starter project for any [Broadleaf Commerce](http://www.broadleafcommerce.org) application.
It has many sensible defaults set up along with examples of how a fully functioning eCommerce site based on Broadleaf might work. 

This project differs from [Demo Site](https://github.com/BroadleafCommerce/DemoSite) in that it uses React and NodeJS for the `site` application and interacts with Broadleaf through the `api` application. This is a good starting point for anyone looking to use Broadleaf for a single-page application.

## Environment Setup

The `site` application requires your environment to have NodeJS and Yarn installed. You will need to download and install both 
of these to your environment. 

NodeJS can be found and downloaded at https://nodejs.org/en/.

You can find the instructions to install Yarn at https://yarnpkg.com/en/docs/install. Mac users can run `brew install yarn`.

## Running the applications
This starter contains several runnable applications: `site`, `admin`, and `api`.
You can run `admin` and `api` as any other Spring Boot application (http://docs.spring.io/spring-boot/docs/current/reference/html/using-boot-running-your-application.html)
These applications automatically configure and start an HSQL DB and SOLR instance (if not already configured).
By default, these will be located in your `java.io.tmp` directory.

### Running the `api` application

This application needs to be the first to run since the `site` application is dependent on the `api` application. You can run
this application by using the Spring Boot Maven Plugin::

```
   > cd api
   > mvn spring-boot:run
```

> Note: Default debug port open on `8085` 

### Running the `site` application

The `site` application is a runnable NodeJS application. You will need to be sure to be running the `api` application first,
as the `site` application is not functional without the `api`. 

Starting up the `site` application requires you to install the dependencies and then running the webpack dev server.

```
   > cd site
   > yarn
   > yarn develop
```

### Running the `admin` application
```
   > cd admin
   > mvn spring-boot:run
```
> Note: Default debug port open on `8084` 

## License

The Broadleaf Commerce Demo Site is itself licensed under the Broadleaf Fair Use License Agreement - Version 1.0 (http://license.broadleafcommerce.org/fair_use_license-1.0.txt). The Broadleaf Commerce core and module libraries have different license models you should be aware of.

Broadleaf Commerce core libraries, as well as the menu library, are released under a dual license format. They may be used under the terms of the Fair Use License 1.0 (http://license.broadleafcommerce.org/fair_use_license-1.0.txt) unless the restrictions on use therein are violated and require payment to Broadleaf, in which case the Broadleaf End User License Agreement (EULA), Version 1.1 (http://license.broadleafcommerce.org/commercial_license-1.1.txt) shall apply. Alternatively, the Commercial License may be replaced with a mutually agreed upon license between you and Broadleaf Commerce.

Various commercial modules that are also available (for instance, price list management) are released under the applicable commercial license. These are not included with the core Broadleaf framework.
