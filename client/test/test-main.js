var allTestFiles = [];
var TEST_REGEXP = /(spec)\.js$/i;

var pathToModule = function(path) {
  return path.replace(/^\/base\/client\/scripts\//, '').replace(/\.js$/, '');
};

Object.keys(window.__karma__.files).forEach(function(file) {
  if (TEST_REGEXP.test(file)) {
    // Normalize paths to RequireJS module names.
    allTestFiles.push(pathToModule(file));
  }
});

require.config({
  // Karma serves files under /base, which is the basePath from your config file
  baseUrl: '/base/client/scripts',
  paths: {
    'angular': '../vendor/angular/angular',
    'angular-route': '../vendor/angular-route/angular-route',
    'angular-aria': '../vendor/angular-aria/angular-aria',
    'angular-touch': '../vendor/angular-touch/angular-touch',
    'angular-sanitize': '../vendor/angular-sanitize/angular-sanitize',

    'angular-mocks': '../vendor/angular-mocks/angular-mocks',

    'angular-ui-router': '../vendor/angular-ui-router/release/angular-ui-router', // jshint ignore:line
    'angular-ui-bootstrap': '../vendor/angular-bootstrap/ui-bootstrap-tpls', // jshint ignore:line
    'ng-toast': '../vendor/ngtoast/dist/ngToast',

    'app': 'app'
  },
  shim: {
    'angular': { exports: 'angular' },
    'angular-route': [ 'angular' ],
    'angular-aria': [ 'angular' ],
    'angular-touch': [ 'angular' ],
    'angular-sanitize': [ 'angular' ],
    'angular-ui-router': [ 'angular-route' ],
    'angular-ui-bootstrap': [ 'angular' ],    
    'ng-toast': [ 'angular-sanitize' ],
    'angular-mocks': [ 'angular' ]
  },
  // dynamically load all test files
  deps: allTestFiles,

  // we have to kickoff jasmine, as it is asynchronous
  callback: window.__karma__.start
});