[<-- Back to the Evidence Listing](https://github.com/itgfirm/safe-food/edit/master/Evidence)  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[Next Evidence (c) -->](https://github.com/itgfirm/safe-food/edit/master/Evidence/h)

***g. set up or used configuration management***

## Single Repository
![github logo](github_logo.png)

[GitHub](https://github.com/itgfirm/safe-food) serves as our repository for all source as well as configurations.  Most of our configurations (i.e. dependencies and settings) for the various libraries that we use are in the usual (by convention) places for Node.js/AngularJS projects such as [package.json](https://github.com/itgfirm/safe-food/blob/master/package.json), [bower.json](https://github.com/itgfirm/safe-food/blob/master/bower.json).

The build and test steps are configured in the NPM Scripts section of [package.json](https://github.com/itgfirm/safe-food/blob/master/package.json) and our Grunt Tasks are configured in [Gruntfile.js](https://github.com/itgfirm/safe-food/blob/master/Gruntfile.js)

The testing process (configurations for running Karma and Jasmine) are set in [karma.conf.js](https://github.com/itgfirm/safe-food/blob/master/client/test/karma.conf.js).

The continuous build and continuous deployemnt processes (trigger, dependencies, build, test, deploy, etc.) are coded in the [.travis.yml](https://github.com/itgfirm/safe-food/blob/master/.travis.yml).  

TravisCI and the Grunt tasks allows us to easily and consistently reproduce, test, and scrutinize all steps in our application’s lifecycle. Other configurations for lesser-used dependencies are in their respective configuration files according to their documentation.

## Secure Information

We recognize that some of the configuration for a running application, especially via Continuous Deployment (CD), is secret in nature, and therefore should not be exposed openly on a public repository.  For these secrets (typically keys and passwords), we have employed two methods for keeping them private.  

#### Encryption

The first method is encryption.  Where practical, we have leveraged the various encryption tools provided by our CI system.  This allows us to provide the secrets to Travis CI for their exclusive use in testing and deploying our application.  

[![Encrypted Keys](https://github.com/itgfirm/safe-food/blob/master/Evidence/g/TravisCI_Encrypted_Keys.png)](https://github.com/itgfirm/safe-food/blob/master/.travis.yml)

#### Environment-Specific Settings

The second method is by putting the secret values directly into the environment in which they will be needed. This is a fairly trivial exercise for developers, and Heroku has a mechanism for setting environment variables for an application.

![Environment Settings](https://github.com/itgfirm/safe-food/blob/master/Evidence/g/Heroku_ENV_Vars.png)

**Specific Configurations**
- [package.json](https://github.com/itgfirm/safe-food/blob/master/package.json)
- [bower.json](https://github.com/itgfirm/safe-food/blob/master/bower.json)
- [Gruntfile.js](https://github.com/itgfirm/safe-food/blob/master/Gruntfile.js)
- [karma.conf.js](https://github.com/itgfirm/safe-food/blob/master/client/test/karma.conf.js)
- [.travis.yml](https://github.com/itgfirm/safe-food/blob/master/.travis.yml)

[<-- Back to the Evidence Listing](https://github.com/itgfirm/safe-food/edit/master/Evidence)  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[Next Evidence (c) -->](https://github.com/itgfirm/safe-food/edit/master/Evidence/h)