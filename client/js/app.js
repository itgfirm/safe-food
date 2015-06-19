angular
  .module('safeFoodApp', ['ngRoute'])
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/todo.html',
        controller: 'theController'
      }).
      otherwise({
        redirectTo: '/'
      });
  }]);