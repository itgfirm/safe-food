require.config({
  paths: {
    'angular': '../vendor/angular/angular',
    'angular-route': '../vendor/angular-route/angular-route',
    'angular-aria': '../vendor/angular-aria/angular-aria',
    'angular-animate': '../vendor/angular-animate/angular-animate',
    'angular-touch': '../vendor/angular-touch/angular-touch',
    'angular-sanitize': '../vendor/angular-sanitize/angular-sanitize',


    'angular-ui-router': '../vendor/angular-ui-router/release/angular-ui-router', // jshint ignore:line
    'angular-ui-bootstrap': '../vendor/angular-bootstrap/ui-bootstrap-tpls', // jshint ignore:line
    'angular-material': '../vendor/angular-material/angular-material',
    'ng-toast': '../vendor/ngtoast/dist/ngToast',

    'app': 'app',
  },
  shim: {
    'angular': { exports: 'angular' },
    'angular-route': [ 'angular' ],
    'angular-aria': [ 'angular' ],
    'angular-animate': [ 'angular' ],
    'angular-touch': [ 'angular' ],
    'angular-sanitize': [ 'angular' ],
    'angular-ui-router': [ 'angular-route' ],
    'angular-ui-bootstrap': [ 'angular' ],
    'angular-material': [ 'angular-aria' ],
    'ng-toast': [ 'angular-sanitize', 'angular-animate' ]
  }
});

require([
    'angular',
    'app',
    'features/_example/_example-config',
    'features/home/home-config',
    'features/food-recall-search/food-recall-search-config',
  ],
  function(angular, app) {
    angular.element().ready(function() {
      angular.bootstrap(document, [ app.name ]);
    });
});
