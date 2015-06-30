define([ 'angular', 'app',
  'features/base/base-config',
  'features/home/home-controller' ],
  function (angular, app) {

    app.config(function($stateProvider) {
      $stateProvider.state('base.home', {
        url: '/',
        views: {
          'content@base': {
            templateUrl: 'scripts/features/home/home.html',
            controller: 'HomeController'
          }
        }
      });
    });

});
