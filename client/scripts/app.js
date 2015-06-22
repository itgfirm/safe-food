define([
    'angular', 
    'angular-aria',
    'angular-animate',
    'angular-touch',
    'angular-ui-router',
    'angular-material',
    'angular-google-maps'
  ],
  function (angular) {
    var app = angular.module('safeFoodApp', [
      'ngAria',
      'ngAnimate',
      'ngTouch',
      'ui.router',
      'ngMaterial',
      'ngMap'
    ]);

    app.config(function($stateProvider, $urlRouterProvider) {
      $stateProvider.state('base', { abstract: true });
      $urlRouterProvider.otherwise('/food-recall-search');
    });

    return app;
});
