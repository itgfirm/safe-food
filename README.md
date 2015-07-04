# safe-food
Safe Food App based on FDA Open Data

[![Build Status](https://travis-ci.org/itgfirm/safe-food.svg?branch=master)](https://travis-ci.org/itgfirm/safe-food)

## Get Started

To install required dependencies:
```
[sudo]npm install
bower install
```

For local development:
```
grunt serve
```
This will serve the application from [localhost:9000](localhost:9000)

For building:
```
grunt build
```
This will concat and minify all the files and write it to client-dist.

For testing:
```
grunt test
```
This will run jshint, karma, and mocha.
