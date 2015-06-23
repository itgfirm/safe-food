define([
    'angular', 
    'angular-aria',
    'angular-animate',
    'angular-touch',
    'angular-ui-router',
    'angular-material'
  ],
  function (angular) {
    var app = angular.module('safeFoodApp', [
      'ngAria',
      'ngAnimate',
      'ngTouch',
      'ui.router',
      'ngMaterial'
    ]);

    app.config(function($stateProvider, $urlRouterProvider) {
      $stateProvider.state('base', { abstract: true });
      $urlRouterProvider.otherwise('/');
    });

    return app;
});
