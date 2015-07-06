[<-- Back to the Evidence Listing](https://github.com/itgfirm/safe-food/edit/master/Evidence)  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[Next Evidence (f) -->](https://github.com/itgfirm/safe-food/edit/master/Evidence/f)

***e. wrote unit tests for their code***

## Automated Testing
ITG wrote unit tests for our code. In agile projects, ensuring that customer requirements are being fully met can be a challenge.  By creating acceptance criteria and associated automated test cases, our team is able to ensure that we continue to meet all requirements during regression testing which occurs in a consistent and automated fashion.

### Unit Tests
Moreover, during development we created more discrete unit tests to ensure our functionality was meeting the desired specifications at all levels (controllers, services, etc.).  

Tests for our front-end components can be found at /client/\*\*/*-spec.js
* [location-service-spec.js](https://github.com/itgfirm/safe-food/blob/master/client/scripts/components/services/location-service/location-service-spec.js)
* [open-fda-service-spec.js](https://github.com/itgfirm/safe-food/blob/master/client/scripts/components/services/open-fda-service/open-fda-service-spec.js)
* [food-recall-search-spec.js](https://github.com/itgfirm/safe-food/blob/master/client/scripts/features/food-recall-search/food-recall-search-spec.js)
* [base-controller-spec.js](https://github.com/itgfirm/safe-food/blob/master/client/scripts/features/base/base-controller-spec.js)
* [home-controller-spec.js](https://github.com/itgfirm/safe-food/blob/master/client/scripts/features/home/home-controller-spec.js)

Tests for our back-end components can be found at /server/test/\*\*/*.js
* [simple-test.js](https://github.com/itgfirm/safe-food/blob/master/server/test/simple-test.js)

![Karma Unit Tests](https://github.com/itgfirm/safe-food/raw/master/Evidence/e/Unit_Tests_Results.png)

Our testing frameworks, Mocha and Karma, are configured in our [Gruntfile.js](https://github.com/itgfirm/safe-food/blob/master/Gruntfile.js).

### End-to-End Testing
We leveraged Selenium as well as SauceLabs for our user acceptance testing (end-to-end testing).  SauceLabs provides virtualization and the ability to dynamically provision testing machines.  While Selenium provides an open source framework for build out and executing test cases.

Tests for end-to-end (and acceptance) can be found at /test/selenium/acceptance.py
* [acceptance.py](https://github.com/itgfirm/safe-food/blob/master/test/selenium/acceptance.py)

The SauceLabs dashboard shows the individual test cases, including the outcome as well as the ability to replay the recorded test execution from the browser.

![SauceLabs Output](https://github.com/itgfirm/safe-food/blob/master/Evidence/e/SauceLabs_Dashboard.png)


### Cross-Browser Testing
SauceLabs provides the ability to easily add Operating Systems and Browsers to any test matrix. For Safe Food we chose to configure a testing environment for several common operating systems and browsers.  Below is our compliance based on those tests:

Tests for cross-browser can be found at /test/selenium/acceptance.py
* [base.py](https://github.com/itgfirm/safe-food/blob/master/test/selenium/base.py)

![SauceLabs Badge](https://github.com/itgfirm/safe-food/blob/master/Evidence/e/SauceLabs_badge_cross-browser.png)

(Note that failures are actually due to performance and tuning of the SauceLabs test execution environment.)



[<-- Back to the Evidence Listing](https://github.com/itgfirm/safe-food/edit/master/Evidence)  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[Next Evidence (f) -->](https://github.com/itgfirm/safe-food/edit/master/Evidence/f)
