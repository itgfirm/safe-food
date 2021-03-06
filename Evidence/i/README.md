[<-- Back to the Evidence Listing](https://github.com/itgfirm/safe-food/edit/master/Evidence)  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[Next Evidence (j) -->](https://github.com/itgfirm/safe-food/edit/master/Evidence/j)

***i. deploy their software in a container (i.e., utilized operating-system-level virtualization)***

## Deplopying in a Container On Heroku

ITG deployed the Safe Food application in a container via Heroku virtualization platform. The Travis CI build, configured in [.travis.yml](https://github.com/itgfirm/safe-food/blob/master/.travis.yml), orchestrated the steps to push the application code into Heroku's virtualized environment.

### Containers
Heroku’s platform by default uses containers (or dynos) which are an encapsulation of their stack, [Cedar-14](https://blog.heroku.com/archives/2014/11/4/cedar_14_now_generally_available), which has been battle-tested and continuously improved over the last four years. Cedar-14 is built on top of Ubuntu 14.04 and offers a [Polyglot platform](http://blog.heroku.com/archives/2011/8/3/polyglot_platform/) - which simply means it can natively support many different software stacks (including Node.js) from dependency management, build, to deploy and runtime.

![Heroku Stack](https://github.com/itgfirm/safe-food/blob/master/Evidence/i/Heroku_Cedar14_Stack.png)

### Virtualization
Heroku's Dyno Manager uses [LXC](https://linuxcontainers.org/lxc/introduction/) to virtualize the containers (dynos).  By starting with the Heroku container abstraction, we are getting a production-ready (hardened, tuned, etc.) environment that allows our team to focus on development rather than managing operating systems, package updates, server infrastructure and their inevitably complex interactions.

Another benefit of Heroku as our PaaS is that they have been leveraging containers as a cornerstone of their infrastructure for several years. They utilize their container system to ensure their platform is secure, performant and scalable. Moreover they have [recently added support for deploying their containers to Docker](https://blog.heroku.com/archives/2015/5/5/introducing_heroku_docker_release_build_deploy_heroku_apps_with_docker) runtimes on developer systems. Utilizing docker to run heroku containers increases consistency and ease of deployment for developers.

[<-- Back to the Evidence Listing](https://github.com/itgfirm/safe-food/edit/master/Evidence)  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[Next Evidence (j) -->](https://github.com/itgfirm/safe-food/edit/master/Evidence/j)
