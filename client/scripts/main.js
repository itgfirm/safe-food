require.config({
  paths: {
    'angular': '../vendor/angular/angular',
    'angular-route': '../vendor/angular-route/angular-route',
    'angular-aria': '../vendor/angular-aria/angular-aria',
    'angular-touch': '../vendor/angular-touch/angular-touch',
    'angular-sanitize': '../vendor/angular-sanitize/angular-sanitize',

    'angular-ui-router': '../vendor/angular-ui-router/release/angular-ui-router', // jshint ignore:line
    'angular-ui-bootstrap': '../vendor/angular-bootstrap/ui-bootstrap-tpls', // jshint ignore:line
    'ng-toast': '../vendor/ngtoast/dist/ngToast',

    'app': 'app',
  },
  shim: {
    'angular': { exports: 'angular' },
    'angular-route': [ 'angular' ],
    'angular-aria': [ 'angular' ],
    'angular-touch': [ 'angular' ],
    'angular-sanitize': [ 'angular' ],
    'angular-ui-router': [ 'angular-route' ],
    'angular-ui-bootstrap': [ 'angular' ],
    'ng-toast': [ 'angular-sanitize' ]
  }
});

require([
    'angular',
    'app',
    'features/home/home-config',
    'features/food-recall-search/food-recall-search-config',
    'decorators/$modal-decorator/$modal-decorator',
    'components/directives/loading-spinner-directive/loading-spinner-directive'
  ],
  function(angular, app) {
    angular.element().ready(function() {
      angular.bootstrap(document, [ app.name ]);
    });
});
