define([ 'angular', 'app', 'features/_example/_example-controller' ],
  function (angular, app) {

    app.config(function($stateProvider) {
      $stateProvider.state('base._example', {
        url: '/example',
        views: {
          'main@': {
            templateUrl: 'scripts/features/_example/_example.html',
            controller: '_ExampleController'
          }
        }
      });
    });

});
