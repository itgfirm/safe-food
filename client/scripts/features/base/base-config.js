define([ 'angular', 'app', 'features/base/base-controller' ],
  function (angular, app) {

    app.config(function($stateProvider) {
      $stateProvider.state('base', {
        abstract: true,
        views: {
          'main@': {
            templateUrl: 'scripts/features/base/base.html',
            controller: 'BaseController'
          }
        }
      });
    });

});
