define([ 'angular', 'app', 'features/home/home-controller' ],
  function (angular, app) {

    app.config(function($stateProvider) {
      $stateProvider.state('base.home', {
        url: '/',
        views: {
          'main@': {
            templateUrl: 'scripts/features/home/home.html',
            controller: 'HomeController'
          }
        }
      });
    });

});
