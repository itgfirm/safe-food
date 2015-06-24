define([
    'angular', 
    'angular-aria',
    'angular-animate',
    'angular-touch',
    'angular-ui-router',
    'angular-ui-bootstrap',
    'angular-material'
  ],
  function (angular) {
    var app = angular.module('safeFoodApp', [
      'ngAria',
      'ngAnimate',
      'ngTouch',
      'ui.router',
      'ui.bootstrap',
      'ngMaterial'
    ]);

    app.config(function($stateProvider, $urlRouterProvider) {
      $stateProvider.state('base', { abstract: true });
      $urlRouterProvider.otherwise('/');
    });

    return app;
});
